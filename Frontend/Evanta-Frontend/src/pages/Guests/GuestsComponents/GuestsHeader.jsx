function GuestsHeader({ onAddGuest }) {
  return (
    <div className="guests-header">
      <div>
        <h1>Guests</h1>
        <p>Manage your event guests</p>
      </div>

      <button className="add-guest-btn" onClick={onAddGuest}>
        <i className="bi bi-plus-lg"></i>
        Add Guest
      </button>
    </div>
  );
}

export default GuestsHeader;
