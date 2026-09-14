import GuestRow from "./GuestRow";

function GuestsList({
  guests,
  openActionId,
  onToggleActions,
  onRsvpChange,
  onDelete,
}) {
  return (
    <div className="guest-list">
      <div className="guest-list-header">
        <span>Guest</span>
        <span>Phone</span>
        <span>RSVP</span>
        <span>Invitation</span>
        <span>Actions</span>
      </div>

      {guests.map((guest) => (
        <GuestRow
          key={guest.id}
          guest={guest}
          openActionId={openActionId}
          onToggleActions={onToggleActions}
          onRsvpChange={onRsvpChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default GuestsList;
