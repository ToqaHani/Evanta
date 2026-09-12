function AddGuestModal({ formData, onInputChange, onSubmit, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-guest-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Add Guest</h2>
            <p>Add a new guest to your event</p>
          </div>

          <button className="modal-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Guest name"
              value={formData.name}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="relationship">Relationship</label>

            <input
              id="relationship"
              name="relationship"
              type="text"
              placeholder="e.g. Friend, Family"
              value={formData.relationship}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>

            <textarea
              id="notes"
              name="notes"
              placeholder="Add any notes..."
              value={formData.notes}
              onChange={onInputChange}
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-guest-btn">
              Save Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGuestModal;
