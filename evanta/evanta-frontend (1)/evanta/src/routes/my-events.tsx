import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarPlus, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import EventFormModal from "@/components/EventFormModal";
import EventDetailsModal from "@/components/EventDetailsModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { addEvent, deleteEvent, getEvents, updateEvent, type EvantaEvent } from "@/lib/events";

export const Route = createFileRoute("/my-events")({
  head: () => ({
    meta: [
      { title: "My Events | EVANTA Event Management" },
      {
        name: "description",
        content:
          "Browse, edit and manage every event you have planned with EVANTA — dates, venues, guests and budgets in one elegant place.",
      },
      { property: "og:title", content: "My Events | EVANTA" },
      {
        property: "og:description",
        content: "All your saved events in one elegant dashboard-free view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyEvents,
});

function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EvantaEvent[]>([]);
  const [ready, setReady] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<EvantaEvent | null>(null);
  const [viewing, setViewing] = useState<EvantaEvent | null>(null);
  const [pendingDelete, setPendingDelete] = useState<EvantaEvent | null>(null);

  useEffect(() => {
    setEvents(getEvents());
    setReady(true);
  }, []);

  const handleSave = (draft: Omit<EvantaEvent, "eventId">, eventId?: string) => {
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

      <Navbar />

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
          <button
            className="btn-evanta btn-evanta-solid"
            onClick={() => navigate({ to: "/create-event" })}
          >
            <CalendarPlus size={16} className="me-2" /> Add Event
          </button>
        </header>

        {ready && events.length === 0 && (
          <section className="evanta-empty fade-up">
            <div className="evanta-empty-icon">
              <CalendarPlus size={30} />
            </div>
            <h2 className="evanta-empty-title">No events yet</h2>
            <p className="evanta-muted mb-4">
              You haven&apos;t added any events yet. Your saved events will appear here.
            </p>
            <button
              className="btn-evanta btn-evanta-solid"
              onClick={() => navigate({ to: "/create-event" })}
            >
              Add your first event
            </button>
          </section>
        )}

        <div className="row g-4">
          {events.map((event, i) => (
            <EventCard
              key={event.eventId}
              event={event}
              index={i}
              onView={setViewing}
              onEdit={(e) => {
                setEditing(e);
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

      {viewing && <EventDetailsModal event={viewing} onClose={() => setViewing(null)} />}

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
