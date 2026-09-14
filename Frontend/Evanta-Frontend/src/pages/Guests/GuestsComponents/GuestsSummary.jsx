function GuestsSummary({
  totalGuests,
  confirmedGuests,
  maybeGuests,
  notComingGuests,
}) {
  return (
    <div className="guest-summary">
      <div className="summary-card">
        <div className="summary-icon total-icon">
          <i className="bi bi-people"></i>
        </div>

        <div className="summary-content">
          <span>Total Guests</span>
          <strong>{totalGuests}</strong>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon confirmed-icon">
          <i className="bi bi-check-lg"></i>
        </div>

        <div className="summary-content">
          <span>Confirmed</span>
          <strong>{confirmedGuests}</strong>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon maybe-icon">
          <i className="bi bi-question-lg"></i>
        </div>

        <div className="summary-content">
          <span>Maybe</span>
          <strong>{maybeGuests}</strong>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon not-coming-icon">
          <i className="bi bi-x-lg"></i>
        </div>

        <div className="summary-content">
          <span>Not Coming</span>
          <strong>{notComingGuests}</strong>
        </div>
      </div>
    </div>
  );
}

export default GuestsSummary;
