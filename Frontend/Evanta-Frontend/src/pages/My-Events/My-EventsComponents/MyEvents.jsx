import { useEffect, useState } from "react";
import "../My-Events.css";
import { CalendarPlus, Sparkles } from "lucide-react";
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
export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [ready, setReady] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    setEvents(getEvents());
    setReady(true);
  }, []);

  const handleSave = (draft, eventId) => {
    setEvents(eventId ? updateEvent({ ...draft, eventId }) : addEvent(draft));
    setFormOpen(false);
    setEditing(null);
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
                ? `${events.length} event${events.length > 1 ? "s" : ""} saved on this device.`
                : "Every event you save appears here."}
            </p>
          </div>

          <button type="button" className="btn-evanta btn-evanta-solid">
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
            <button type="button" className="btn-evanta btn-evanta-solid">
              <CalendarPlus size={18} />
              Add your first event
            </button>
          </section>
        )}

        <div className="row g-4">
          {events.map((event, index) => (
            <EventCard
              key={event.eventId}
              event={event}
              index={index}
              onView={setViewing}
              onEdit={(item) => {
                setEditing(item);
                setFormOpen(true);
              }}
              onDelete={setPendingDelete}
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
        <EventDetailsModal event={viewing} onClose={() => setViewing(null)} />
      )}

      {pendingDelete && (
        <ConfirmDialog
          message={`Are you sure you want to delete “${pendingDelete.eventName}”? This action cannot be undone.`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            setEvents(deleteEvent(pendingDelete.eventId));
            setPendingDelete(null);
          }}
        />
      )}
    </div>
  );
}
