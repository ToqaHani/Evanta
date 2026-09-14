import { useEffect, useState } from "react";
import "../My-Events.css";
import { CalendarPlus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import EventFormModal from "./EventFormModal";
import EventDetailsModal from "./EventDetailsModal";
import ConfirmDialog from "./ConfirmDailog";
import {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../../components/My-Events/events";
import { useEvent } from "../../../context/EventContext";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [ready, setReady] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const { setCurrentEvent } = useEvent();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    };

    loadEvents();
  }, []);

  const handleSave = async (draft, eventId) => {
    try {
      if (eventId) {
        const updatedEvent = await updateEvent({
          ...draft,
          _id: eventId,
        });

        setEvents((currentEvents) =>
          currentEvents.map((event) =>
            event._id === eventId ? updatedEvent : event,
          ),
        );

        setCurrentEvent(updatedEvent);
      } else {
        const createdEvent = await addEvent(draft);

        setEvents((currentEvents) => [...currentEvents, createdEvent]);

        setCurrentEvent(createdEvent);
      }

      setFormOpen(false);
      setEditing(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(pendingDelete._id);

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event._id !== pendingDelete._id),
      );

      setPendingDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="evanta-page">
      <div className="evanta-bg" aria-hidden="true">
        <span className="shape shape-1" />
        <span className="shape shape-2" />
        <span className="shape shape-3" />
      </div>

      <main className="container py-5">
        <header className="d-flex flex-wrap gap-3 align-items-end justify-content-between mb-5 fade-up">
          <div>
            <span className="evanta-eyebrow">
              <Sparkles size={14} /> Your collection
            </span>

            <h1 className="evanta-title mt-2 mb-1">My Events</h1>

            <p className="evanta-muted mb-0">
              {events.length > 0
                ? `${events.length} event${
                    events.length > 1 ? "s" : ""
                  } saved to your account.`
                : "Every event you create appears here."}
            </p>
          </div>

          <button
            type="button"
            className="btn-evanta btn-evanta-solid"
            onClick={() => navigate("/create-event")}
          >
            <CalendarPlus size={18} />
            Add Event
          </button>
        </header>

        {ready && events.length === 0 && (
          <section className="evanta-empty fade-up">
            <div className="evanta-empty-icon">
              <CalendarPlus size={30} />
            </div>

            <h2 className="evanta-empty-title">No events yet</h2>

            <p className="evanta-muted mb-4">
              You haven't added any events yet. Your saved events will appear
              here.
            </p>

            <button
              type="button"
              className="btn-evanta btn-evanta-solid"
              onClick={() => navigate("/create-event")}
            >
              <CalendarPlus size={18} />
              Add your first event
            </button>
          </section>
        )}

        <div className="row g-4">
          {events.map((event, index) => (
            <EventCard
              key={event._id}
              event={event}
              index={index}
              onView={setViewing}
              onEdit={(item) => {
                setEditing(item);
                setFormOpen(true);
              }}
              onDelete={setPendingDelete}
              onWorkOn={(event) => {
                setCurrentEvent(event);
                navigate("/dashboard");
              }}
            />
          ))}
        </div>
      </main>

      {formOpen && (
        <EventFormModal
          event={editing}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}

      {viewing && (
        <EventDetailsModal
          event={viewing}
          onClose={() => setViewing(null)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          message={`Are you sure you want to delete “${pendingDelete.name}”? This action cannot be undone.`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}