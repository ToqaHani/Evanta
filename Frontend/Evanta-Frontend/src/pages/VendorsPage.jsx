import { useMemo, useState } from "react";
import Icon from "../components/Icons";
import "./VendorsPage.css";

const initialVendors = [
  {
    id: 1,
    type: "Photographer",
    name: "Ahmed Photography",
    phone: "01012345678",
    price: 3000,
    date: "20 September 2026",
    status: "Booked",
    notes: "Outdoor photography",
  },
  {
    id: 2,
    type: "Decorator",
    name: "Elegant Decor",
    phone: "01123456789",
    price: 4500,
    date: "20 September 2026",
    status: "Booked",
    notes: "Engagement stage and flowers",
  },
  {
    id: 3,
    type: "Catering",
    name: "Taste Catering",
    phone: "01234567890",
    price: 9500,
    date: "20 September 2026",
    status: "Booked",
    notes: "100 guests",
  },
  {
    id: 4,
    type: "Venue",
    name: "Banha Garden Hall",
    phone: "01098765432",
    price: 8500,
    date: "20 September 2026",
    status: "Booked",
    notes: "Main hall",
  },
  {
    id: 5,
    type: "DJ",
    name: "DJ Karim",
    phone: "01199887766",
    price: 2500,
    date: "20 September 2026",
    status: "Pending",
    notes: "Sound system included",
  },
  {
    id: 6,
    type: "Makeup Artist",
    name: "Mona Beauty",
    phone: "01288776655",
    price: 1800,
    date: "20 September 2026",
    status: "Pending",
    notes: "Bridal makeup",
  },
];

const vendorTypes = [
  "All",
  "Photographer",
  "Decorator",
  "Catering",
  "DJ",
  "Makeup Artist",
  "Venue",
  "Other",
];

const emptyForm = {
  type: "Photographer",
  name: "",
  phone: "",
  price: "",
  date: "20 September 2026",
  status: "Pending",
  notes: "",
};

function VendorsPage() {
  const [vendors, setVendors] = useState(initialVendors);
  const [activeType, setActiveType] = useState("All");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesType =
        activeType === "All" || vendor.type === activeType;

      const text = `${vendor.name} ${vendor.type} ${vendor.phone}`
        .toLowerCase();

      const matchesSearch = text.includes(query.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [vendors, activeType, query]);

  const booked = vendors.filter(
    (vendor) => vendor.status === "Booked"
  ).length;

  const pending = vendors.filter(
    (vendor) => vendor.status === "Pending"
  ).length;

  function openAddVendor() {
    setForm(emptyForm);
    setModal("add");
  }

  function saveVendor(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.price) {
      return;
    }

    const newVendor = {
      ...form,
      id: Date.now(),
      price: Number(form.price),
    };

    setVendors((current) => [...current, newVendor]);
    setModal(null);
  }

  function deleteVendor(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (confirmed) {
      setVendors((current) =>
        current.filter((vendor) => vendor.id !== id)
      );
    }
  }

  function openDetails(vendor) {
    setSelectedVendor(vendor);
    setModal("details");
  }

  return (
    <div className="app-shell">
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Event</span>
            <b>/</b>
            <strong>Vendors</strong>
          </div>

          <div className="top-actions">
            <button
              className="icon-btn"
              type="button"
              aria-label="Notifications"
            >
              <Icon name="bell" />
            </button>

            <button className="profile-btn" type="button">
              <span className="avatar">A</span>
              Ahmed
            </button>
          </div>
        </header>

        <section className="page">
          <div className="page-heading">
            <div>
              <div className="section-kicker">
                EVENT SERVICES
              </div>

              <h1>Vendors</h1>

              <p>
                Manage all service providers for your active event.
              </p>
            </div>

            <button
              className="primary-btn"
              type="button"
              onClick={openAddVendor}
            >
              <Icon name="plus" size={15} />
              Add Vendor
            </button>
          </div>

          <div className="type-row">
            {vendorTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`type-chip ${
                  activeType === type ? "active" : ""
                }`}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="stats-grid">
            <StatCard
              icon="briefcase"
              tone="brown"
              label="Total Vendors"
              value={vendors.length}
            />

            <StatCard
              icon="check"
              tone="green"
              label="Booked"
              value={booked}
            />

            <StatCard
              icon="clock"
              tone="orange"
              label="Pending"
              value={pending}
            />
          </div>

          <section className="vendor-panel">
            <div className="toolbar">
              <div>
                <strong>Vendor Cards</strong>
                <span>
                  {filteredVendors.length}{" "}
                  {filteredVendors.length === 1
                    ? "result"
                    : "results"}
                </span>
              </div>

              <div className="search-box">
                <Icon name="search" size={15} />

                <input
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search vendors..."
                />
              </div>
            </div>

            {filteredVendors.length === 0 ? (
              <div className="empty">
                <Icon name="briefcase" size={30} />

                <h3>No vendors found</h3>

                <p>
                  Try another filter or add a new vendor.
                </p>
              </div>
            ) : (
              <div className="vendor-grid">
                {filteredVendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    onView={() => openDetails(vendor)}
                    onDelete={() =>
                      deleteVendor(vendor.id)
                    }
                  />
                ))}
              </div>
            )}
          </section>
        </section>
      </main>

      {modal === "details" && selectedVendor && (
        <Modal
          title="Vendor Details"
          onClose={() => setModal(null)}
        >
          <div className="detail-hero">
            <div className="vendor-icon">
              <Icon name="briefcase" />
            </div>

            <div>
              <div className="section-kicker">
                {selectedVendor.type}
              </div>

              <h2>{selectedVendor.name}</h2>

              <Status status={selectedVendor.status} />
            </div>
          </div>

          <div className="detail-grid">
            <Detail
              label="Vendor Type"
              value={selectedVendor.type}
            />

            <Detail
              label="Phone"
              value={selectedVendor.phone}
            />

            <Detail
              label="Price"
              value={`${Number(
                selectedVendor.price
              ).toLocaleString()} EGP`}
            />

            <Detail
              label="Service Date"
              value={selectedVendor.date}
            />
          </div>

          <div className="note-box">
            <span>Notes</span>

            <p>
              {selectedVendor.notes ||
                "No notes added."}
            </p>
          </div>
        </Modal>
      )}

      {modal === "add" && (
        <Modal
          title="Add Vendor"
          onClose={() => setModal(null)}
        >
          <form
            className="vendor-form"
            onSubmit={saveVendor}
          >
            <div className="form-grid">
              <Field label="Type">
                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      type: event.target.value,
                    })
                  }
                >
                  {vendorTypes
                    .filter((type) => type !== "All")
                    .map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                </select>
              </Field>

              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  placeholder="Vendor name"
                />
              </Field>

              <Field label="Phone">
                <input
                  required
                  value={form.phone}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      phone: event.target.value,
                    })
                  }
                  placeholder="01xxxxxxxxx"
                />
              </Field>

              <Field label="Price (EGP)">
                <input
                  required
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      price: event.target.value,
                    })
                  }
                  placeholder="0"
                />
              </Field>

              <Field label="Service Date">
                <input
                  value={form.date}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      date: event.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Booking Status">
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Booked">Booked</option>
                </select>
              </Field>
            </div>

            <Field label="Notes">
              <textarea
                rows="3"
                value={form.notes}
                onChange={(event) =>
                  setForm({
                    ...form,
                    notes: event.target.value,
                  })
                }
                placeholder="Add notes..."
              />
            </Field>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-btn"
              >
                Save Vendor
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ icon, tone, label, value }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon name={icon} />
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Status({ status }) {
  return (
    <span className={`status ${status.toLowerCase()}`}>
      <i />
      {status}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function VendorCard({
  vendor,
  onView,
  onDelete,
}) {
  return (
    <article className="vendor-card">
      <div className="card-top">
        <div className="vendor-icon">
          <Icon name="briefcase" />
        </div>

        <Status status={vendor.status} />
      </div>

      <div className="section-kicker">
        {vendor.type}
      </div>

      <h3>{vendor.name}</h3>

      <div className="meta">
        <div>
          <Icon name="phone" size={14} />
          {vendor.phone}
        </div>

        <div>
          <Icon name="calendar" size={14} />
          {vendor.date}
        </div>
      </div>

      <div className="price">
        {Number(vendor.price).toLocaleString()}{" "}
        <small>EGP</small>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="secondary-btn"
          onClick={onView}
        >
          View Details
          <Icon name="arrowRight" size={14} />
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={onDelete}
          aria-label={`Delete ${vendor.name}`}
        >
          <Icon name="trash" size={15} />
        </button>
      </div>
    </article>
  );
}

function Modal({
  title,
  onClose,
  children,
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default VendorsPage;