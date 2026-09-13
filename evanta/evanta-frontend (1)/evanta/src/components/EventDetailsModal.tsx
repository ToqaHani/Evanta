import Modal from "./Modal";
import { displayType, formatDate, formatMoney, type EvantaEvent } from "@/lib/events";

export default function EventDetailsModal({
  event,
  onClose,
}: {
  event: EvantaEvent;
  onClose: () => void;
}) {
  const rows: [string, string][] = [
    ["Event Name", event.eventName],
    ["Event Type", event.eventType],
    ["Custom Event Type", event.customEventType || "—"],
    ["Date", formatDate(event.date)],
    ["Time", event.time || "—"],
    ["Location", event.location || "—"],
    ["Expected Guests", event.expectedGuests || "—"],
    ["Budget", formatMoney(event.budget)],
  ];

  return (
    <Modal title={displayType(event)} onClose={onClose}>
      <div className="evanta-details">
        {rows.map(([label, value]) => (
          <div key={label} className="evanta-detail-row">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end pt-3">
        <button className="btn-evanta btn-evanta-solid" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
