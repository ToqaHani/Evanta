function GuestRow({
  guest,
  openActionId,
  onToggleActions,
  onRsvpChange,
  onDelete,
}) {
  return (
    <div className="guest-row">
      <span className="guest-name">{guest.name}</span>

      <span>{guest.phone}</span>

      <span>
        <span
          className={`status-badge ${guest.rsvp
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {guest.rsvp}
        </span>
      </span>

      <span>
        <span
          className={`invitation-badge ${guest.invitation
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {guest.invitation}
        </span>
      </span>

      <div className="action-wrapper">
        <button
          className="action-btn"
          onClick={() => onToggleActions(guest.id)}
        >
          <i className="bi bi-three-dots-vertical"></i>
        </button>

        {openActionId === guest.id && (
          <div className="action-menu">
            <button onClick={() => onRsvpChange(guest.id, "Confirmed")}>
              Confirmed
            </button>

            <button onClick={() => onRsvpChange(guest.id, "Maybe")}>
              Maybe
            </button>

            <button onClick={() => onRsvpChange(guest.id, "Not Coming")}>
              Not Coming
            </button>

            <button onClick={() => onRsvpChange(guest.id, "No Response")}>
              No Response
            </button>

            <button
              className="delete-action"
              onClick={() => onDelete(guest.id)}
            >
              <i className="bi bi-trash3"></i>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuestRow;
