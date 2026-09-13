import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { addEvent, EVENT_TYPES } from "@/lib/events";

export const Route = createFileRoute("/create-event")({
  head: () => ({ meta: [{ title: "Create Your Event | EVANTA" }] }),
  component: CreateEvent,
});

type Form = {
  eventType: string;
  customEventType: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  expectedGuests: string;
  budget: string;
};

const initial: Form = {
  eventType: "",
  customEventType: "",
  eventName: "",
  date: "",
  time: "",
  location: "",
  expectedGuests: "",
  budget: "",
};

function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(initial);
  const [error, setError] = useState("");

  const set = (key: keyof Form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.eventType) {
      setError("Please choose an event type.");
      return;
    }
    addEvent(form);
    navigate({ to: "/my-events" });
  };

  return (
    <div className="evanta-page">
      <div className="evanta-bg" aria-hidden="true">
        <span className="shape shape-1" />
        <span className="shape shape-2" />
        <span className="shape shape-3" />
        <span className="shape shape-4" />
      </div>

      <Navbar />

      <main className="container py-5">
        <section className="create-event-shell fade-up">
          <div className="create-event-heading">
            <span className="evanta-eyebrow">Plan it your way</span>
            <h1 className="evanta-title mt-2 mb-2">Create Your Event</h1>
            <p className="evanta-muted mb-0">Let&apos;s start with the basic information about your event.</p>
          </div>

          <form className="create-event-form" onSubmit={submit}>
            <div className="create-event-section">
              <h2 className="create-event-section-title">Event Type</h2>
              <div className="event-type-grid">
                {EVENT_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`event-type-option ${form.eventType === type ? "selected" : ""}`}
                    onClick={() => set("eventType", type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {form.eventType === "Other" && (
                <input
                  className="evanta-input mt-3"
                  value={form.customEventType}
                  onChange={(e) => set("customEventType", e.target.value)}
                  placeholder="Describe your event"
                  required
                />
              )}
            </div>

            <div className="create-event-fields">
              <div className="create-field full">
                <label className="evanta-label" htmlFor="eventName">Event Name</label>
                <input id="eventName" className="evanta-input" required value={form.eventName} onChange={(e) => set("eventName", e.target.value)} placeholder="Toka & Ahmed Engagement" />
              </div>
              <div className="create-field">
                <label className="evanta-label" htmlFor="date">Date</label>
                <input id="date" type="date" className="evanta-input" required value={form.date} onChange={(e) => set("date", e.target.value)} />
              </div>
              <div className="create-field">
                <label className="evanta-label" htmlFor="time">Time</label>
                <input id="time" type="time" className="evanta-input" required value={form.time} onChange={(e) => set("time", e.target.value)} />
              </div>
              <div className="create-field full">
                <label className="evanta-label" htmlFor="location">Location</label>
                <input id="location" className="evanta-input" required value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Banha" />
              </div>
              <div className="create-field">
                <label className="evanta-label" htmlFor="guests">Expected Guests</label>
                <input id="guests" type="number" min="1" className="evanta-input" required value={form.expectedGuests} onChange={(e) => set("expectedGuests", e.target.value)} placeholder="100" />
              </div>
              <div className="create-field">
                <label className="evanta-label" htmlFor="budget">Budget</label>
                <input id="budget" type="number" min="0" className="evanta-input" required value={form.budget} onChange={(e) => set("budget", e.target.value)} placeholder="30000" />
              </div>
            </div>

            {error && <p className="create-event-error" role="alert">{error}</p>}

            <div className="create-event-actions">
              <button type="button" className="btn-evanta btn-evanta-ghost" onClick={() => navigate({ to: "/my-events" })}>Cancel</button>
              <button type="submit" className="btn-evanta btn-evanta-solid">Create Event</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
