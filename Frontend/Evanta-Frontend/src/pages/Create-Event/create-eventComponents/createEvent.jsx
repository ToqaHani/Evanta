import { useState } from "react";
import "../create-event.css";
import { useEvent } from "../../../context/EventContext";
import { addEvent, EVENT_TYPES } from "../../../components/My-Events/events";

const initial = {
  eventType: "",
  customEventType: "",
  eventName: "",
  date: "",
  time: "",
  location: "",
  expectedGuests: "",
  budget: "",
};

export default function CreateEvent() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setCurrentEvent } = useEvent();

  const set = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setSuccess("");
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!form.eventType) {
      setError("Please choose an event type.");
      return;
    }

    try {
      const createdEvent = await addEvent(form);

      setCurrentEvent(createdEvent);

      setForm(initial);
      setSuccess("Event created successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create event.",
      );
    }
  };

  return (
    <div className="evanta-page">
      <div className="evanta-bg" aria-hidden="true">
        <span className="shape shape-1" />
        <span className="shape shape-2" />
        <span className="shape shape-3" />
        <span className="shape shape-4" />
      </div>

      <main className="container py-5">
        <section className="create-event-shell fade-up">
          <div className="create-event-heading">
            <span className="evanta-eyebrow">Plan it your way</span>

            <h1 className="evanta-title mt-2 mb-2">Create Your Event</h1>

            <p className="evanta-muted mb-0">
              Let's start with the basic information about your event.
            </p>
          </div>

          <form className="create-event-form" onSubmit={submit}>
            <div className="create-event-section">
              <h2 className="create-event-section-title">Event Type</h2>

              <div className="event-type-grid">
                {EVENT_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`event-type-option ${
                      form.eventType === type ? "selected" : ""
                    }`}
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
                <label className="evanta-label" htmlFor="eventName">
                  Event Name
                </label>

                <input
                  id="eventName"
                  className="evanta-input"
                  required
                  value={form.eventName}
                  onChange={(e) => set("eventName", e.target.value)}
                  placeholder="Toka & Ahmed Engagement"
                />
              </div>

              <div className="create-field">
                <label className="evanta-label" htmlFor="date">
                  Date
                </label>

                <input
                  id="date"
                  type="date"
                  className="evanta-input"
                  required
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>

              <div className="create-field">
                <label className="evanta-label" htmlFor="time">
                  Time
                </label>

                <input
                  id="time"
                  type="time"
                  className="evanta-input"
                  required
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                />
              </div>

              <div className="create-field full">
                <label className="evanta-label" htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  className="evanta-input"
                  required
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="Banha"
                />
              </div>

              <div className="create-field">
                <label className="evanta-label" htmlFor="guests">
                  Expected Guests
                </label>

                <input
                  id="guests"
                  type="number"
                  min="1"
                  className="evanta-input"
                  required
                  value={form.expectedGuests}
                  onChange={(e) => set("expectedGuests", e.target.value)}
                  placeholder="100"
                />
              </div>

              <div className="create-field">
                <label className="evanta-label" htmlFor="budget">
                  Budget
                </label>

                <input
                  id="budget"
                  type="number"
                  min="0"
                  className="evanta-input"
                  required
                  value={form.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  placeholder="30000"
                />
              </div>
            </div>

            {error && (
              <p className="create-event-error" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="create-event-success" role="status">
                {success}
              </p>
            )}

            <div className="create-event-actions">
              <button type="button" className="btn-evanta btn-evanta-ghost">
                Cancel
              </button>

              <button type="submit" className="btn-evanta btn-evanta-solid">
                Create Event
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
