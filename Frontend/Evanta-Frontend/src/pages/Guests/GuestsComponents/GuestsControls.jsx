function GuestsControls({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
}) {
  const filters = ["All", "Confirmed", "Maybe", "Not Coming", "No Response"];

  return (
    <div className="guests-controls">
      <div className="search-box">
        <i className="bi bi-search"></i>

        <input
          type="text"
          placeholder="Search guests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="guest-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GuestsControls;
