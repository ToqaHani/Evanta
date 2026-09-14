import { CalendarDays, Clock, MapPin, Users, Wallet } from "lucide-react";
import {
  displayType,
  formatDate,
  formatMoney,
} from "../../../components/My-Events/events";

export default function EventCard({
  event,
  index,
  onView,
  onEdit,
  onDelete,
  onWorkOn,
}) {
  return (
    <div className="col-12 col-md-6 col-xl-4">
      <article
        className="evanta-card fade-up h-100"
        style={{ animationDelay: `${index * 70}ms` }}
      >
        <span className="evanta-chip">{displayType(event)}</span>

        <h3 className="evanta-card-title">{event.name}</h3>

        <ul className="evanta-meta">
          <li>
            <CalendarDays size={16} /> {formatDate(event.date)}
          </li>
          <li>
            <Clock size={16} /> {event.time || "—"}
          </li>
          <li>
            <MapPin size={16} /> {event.location || "—"}
          </li>
          <li>
            <Users size={16} /> {event.expectedGuests || "—"} guests
          </li>
          <li>
            <Wallet size={16} /> {formatMoney(event.budget)}
          </li>
        </ul>

        <div className="evanta-card-actions">
          <button
            className="btn-evanta btn-evanta-solid"
            onClick={() => onWorkOn(event)}
          >
            Work on
          </button>
          <button
            className="btn-evanta btn-evanta-solid"
            onClick={() => onView(event)}
          >
            View Details
          </button>
          <button
            className="btn-evanta btn-evanta-ghost"
            onClick={() => onEdit(event)}
          >
            Edit
          </button>
          <button
            className="btn-evanta btn-evanta-danger"
            onClick={() => onDelete(event)}
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  );
}
