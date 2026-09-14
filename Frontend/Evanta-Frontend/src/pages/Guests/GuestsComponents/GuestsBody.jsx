import { useEffect, useState } from "react";
import { useEvent } from "../../../context/EventContext";
import GuestsHeader from "./GuestsHeader";
import GuestsSummary from "./GuestsSummary";
import GuestsControls from "./GuestsControls";
import GuestsList from "./GuestsList";
import AddGuestModal from "./AddGuestModal";

import "../Guests.css";

const API_URL = "http://localhost:3000/api";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  relationship: "",
  notes: "",
};

function GuestsBody() {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [openActionId, setOpenActionId] = useState(null);
  const { currentEvent } = useEvent();
  const EVENT_ID = currentEvent?._id;

  // =========================
  // Get Guests
  // =========================

  useEffect(() => {
    if (!EVENT_ID) return;
    const fetchGuests = async () => {
      try {
        const response = await fetch(`${API_URL}/events/${EVENT_ID}/guests`);

        if (!response.ok) {
          throw new Error("Failed to fetch guests");
        }

        const data = await response.json();

        const formattedGuests = data.map((guest) => ({
          id: guest._id,
          name: guest.name,
          phone: guest.phone,
          rsvp: guest.status,
          invitation: "Not Sent",
        }));

        setGuests(formattedGuests);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };

    fetchGuests();
  }, [EVENT_ID]);

  // =========================
  // Input Change
  // =========================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Add Guest
  // =========================

  const handleAddGuest = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/events/${EVENT_ID}/guests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add guest");
      }

      const guest = await response.json();

      const formattedGuest = {
        id: guest._id,
        name: guest.name,
        phone: guest.phone,
        rsvp: guest.status,
        invitation: "Not Sent",
      };

      setGuests((prev) => [...prev, formattedGuest]);

      setFormData(emptyForm);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  };

  // =========================
  // Change RSVP
  // =========================

  const handleRsvpChange = async (guestId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/guests/${guestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update guest");
      }

      const updatedGuest = await response.json();

      setGuests((prev) =>
        prev.map((guest) =>
          guest.id === guestId
            ? {
                ...guest,
                rsvp: updatedGuest.status,
              }
            : guest,
        ),
      );

      setOpenActionId(null);
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  };

  // =========================
  // Delete Guest
  // =========================

  const handleDeleteGuest = async (guestId) => {
    try {
      const response = await fetch(`${API_URL}/guests/${guestId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete guest");
      }

      setGuests((prev) => prev.filter((guest) => guest.id !== guestId));

      setOpenActionId(null);
    } catch (error) {
      console.error("Error deleting guest:", error);
    }
  };

  // =========================
  // Search + Filter
  // =========================

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm);

    const matchesFilter = activeFilter === "All" || guest.rsvp === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // =========================
  // Summary
  // =========================

  const totalGuests = guests.length;

  const confirmedGuests = guests.filter(
    (guest) => guest.rsvp === "Confirmed",
  ).length;

  const maybeGuests = guests.filter((guest) => guest.rsvp === "Maybe").length;

  const notComingGuests = guests.filter(
    (guest) => guest.rsvp === "Not Coming",
  ).length;

  // =========================
  // Render
  // =========================

  return (
    <main className="guests-page">
      <GuestsHeader
        onAddGuest={() => {
          setFormData(emptyForm);
          setShowModal(true);
        }}
      />

      <GuestsSummary
        totalGuests={totalGuests}
        confirmedGuests={confirmedGuests}
        maybeGuests={maybeGuests}
        notComingGuests={notComingGuests}
      />

      <section className="guests-container">
        <GuestsControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <GuestsList
          guests={filteredGuests}
          openActionId={openActionId}
          onToggleActions={(guestId) => {
            setOpenActionId(openActionId === guestId ? null : guestId);
          }}
          onRsvpChange={handleRsvpChange}
          onDelete={handleDeleteGuest}
        />
      </section>

      {showModal && (
        <AddGuestModal
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleAddGuest}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}

export default GuestsBody;
