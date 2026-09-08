import { useState } from "react";

import GuestsHeader from "../../components/Guests/GuestsHeader";
import GuestsSummary from "../../components/Guests/GuestsSummary";
import GuestsControls from "../../components/Guests/GuestsControls";
import GuestsList from "../../components/Guests/GuestsList";
import AddGuestModal from "../../components/Guests/AddGuestModal";

function Guests() {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openActionId, setOpenActionId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
    notes: "",
  });

  const totalGuests = guests.length;

  const confirmedGuests = guests.filter(
    (guest) => guest.rsvp === "Confirmed",
  ).length;

  const maybeGuests = guests.filter((guest) => guest.rsvp === "Maybe").length;

  const notComingGuests = guests.filter(
    (guest) => guest.rsvp === "Not Coming",
  ).length;

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter === "All" || guest.rsvp === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddGuest = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    const newGuest = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      rsvp: "No Response",
      invitation: "Not Sent",
      email: formData.email,
      relationship: formData.relationship,
      notes: formData.notes,
    };

    setGuests((prevGuests) => [...prevGuests, newGuest]);

    setFormData({
      name: "",
      phone: "",
      email: "",
      relationship: "",
      notes: "",
    });

    setIsModalOpen(false);
  };

  const handleRsvpChange = (guestId, newRsvp) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.id === guestId ? { ...guest, rsvp: newRsvp } : guest,
      ),
    );

    setOpenActionId(null);
  };

  const handleDeleteGuest = (guestId) => {
    setGuests((prevGuests) =>
      prevGuests.filter((guest) => guest.id !== guestId),
    );

    setOpenActionId(null);
  };

  return (
    <main className="guests-page">
      <GuestsHeader onAddGuest={() => setIsModalOpen(true)} />

      <GuestsSummary
        totalGuests={totalGuests}
        confirmedGuests={confirmedGuests}
        maybeGuests={maybeGuests}
        notComingGuests={notComingGuests}
      />

      <GuestsControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <GuestsList
        guests={filteredGuests}
        openActionId={openActionId}
        onToggleActions={(guestId) =>
          setOpenActionId(openActionId === guestId ? null : guestId)
        }
        onRsvpChange={handleRsvpChange}
        onDelete={handleDeleteGuest}
      />

      {isModalOpen && (
        <AddGuestModal
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleAddGuest}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}

export default Guests;
