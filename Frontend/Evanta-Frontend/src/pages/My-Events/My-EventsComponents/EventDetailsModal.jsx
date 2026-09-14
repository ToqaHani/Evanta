import Modal from "./Modal";
import {
  displayType,
  formatDate,
  formatMoney,
} from "../../../components/My-Events/events";

export default function EventDetailsModal({ event, onClose }) {
  const details = [
    {
      label: "Event Name",
      value: event.name || "—",
    },
    {
      label: "Event Type",
      value: displayType(event),
    },
    {
      label: "Date",
      value: formatDate(event.date),
    },
    {
      label: "Time",
      value: event.time || "—",
    },
    {
      label: "Location",
      value: event.location || "—",
    },
    {
      label: "Expected Guests",
      value: event.expectedGuests || "—",
    },
    {
      label: "Budget",
      value: formatMoney(event.budget),
    },
  ];

  return (
    <Modal title="Event Details" onClose={onClose}>
      <div className="event-details-header">
        <div>
          <h3>{event.name || "Unnamed Event"}</h3>
          <span>{displayType(event)}</span>
        </div>
      </div>

      <div className="evanta-details-grid">
        {details.map(({ label, value }) => (
          <div className="evanta-detail-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end pt-4">
        <button className="btn-evanta btn-evanta-solid" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
