import { useState } from "react";
import Modal from "./Modal";
import { EVENT_TYPES } from "../../../components/My-Events/events";

const empty = {
  eventType: "Wedding",
  customEventType: "",
  eventName: "",
  date: "",
  time: "",
  location: "",
  expectedGuests: "",
  budget: "",
};

export default function EventFormModal({ event, onClose, onSave }) {
  const [form, setForm] = useState(
    event
      ? {
          eventType: EVENT_TYPES.includes(event.type) ? event.type : "Other",
          customEventType: EVENT_TYPES.includes(event.type)
            ? ""
            : event.type || "",
          eventName: event.name || "",
          date: event.date ? event.date.slice(0, 10) : "",
          time: event.time || "",
          location: event.location || "",
          expectedGuests: event.expectedGuests ?? "",
          budget: event.budget ?? "",
        }
      : empty,
  );

  const set = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (eventObject) => {
    eventObject.preventDefault();
    onSave(form, event?._id);
  };

  return (
    <Modal title={event ? "Edit Event" : "Add New Event"} onClose={onClose}>
      <form className="row g-3" onSubmit={submit}>
        <div className="col-12">
          <label className="evanta-label">Event Name</label>
          <input
            className="evanta-input"
            required
            value={form.eventName}
            onChange={(e) => set("eventName", e.target.value)}
            placeholder="Golden Anniversary Gala"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="evanta-label">Event Type</label>
          <select
            className="evanta-input"
            value={form.eventType}
            onChange={(e) => set("eventType", e.target.value)}
          >
            {EVENT_TYPES.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label className="evanta-label">Custom Event Type</label>
          <input
            className="evanta-input"
            value={form.customEventType}
            disabled={form.eventType !== "Other"}
            onChange={(e) => set("customEventType", e.target.value)}
            placeholder={
              form.eventType === "Other"
                ? "Describe your event"
                : 'Select "Other"'
            }
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="evanta-label">Date</label>
          <input
            type="date"
            className="evanta-input"
            required
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="evanta-label">Time</label>
          <input
            type="time"
            className="evanta-input"
            value={form.time}
            onChange={(e) => set("time", e.target.value)}
          />
        </div>

        <div className="col-12">
          <label className="evanta-label">Location</label>
          <input
            className="evanta-input"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="The Grand Hall, Cairo"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="evanta-label">Expected Guests</label>
          <input
            type="number"
            min="0"
            className="evanta-input"
            value={form.expectedGuests}
            onChange={(e) => set("expectedGuests", e.target.value)}
            placeholder="120"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="evanta-label">Budget</label>
          <input
            type="number"
            min="0"
            className="evanta-input"
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            placeholder="8000"
          />
        </div>

        <div className="col-12 d-flex flex-wrap gap-2 justify-content-end pt-2">
          <button
            type="button"
            className="btn-evanta btn-evanta-ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit" className="btn-evanta btn-evanta-solid">
            {event ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
