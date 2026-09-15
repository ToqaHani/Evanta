import React, { useEffect, useMemo, useState } from "react";
import { useEvent } from "../../../context/EventContext";
import "../VendorsPage.css";

const API_URL = "http://localhost:3000/api/vendors";

const DEFAULT_CATEGORIES = [
  "All",
  "Photographer",
  "Decorator",
  "Catering",
  "DJ",
  "Makeup Artist",
  "Venue",
  "Other",
];

const emptyVendor = {
  name: "",
  category: "Other",
  phone: "",
  eventDate: "",
  price: "",
  status: "Pending",
  notes: "",
};

function BriefcaseIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 11h18" />
    </svg>
  );
}

function ClockIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function SearchIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function TrashIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 15H6L5 6" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  );
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(value) {
  const number = Number(value);

  if (value === "" || value === null || value === undefined) {
    return "—";
  }

  if (Number.isNaN(number)) {
    return "—";
  }

  return number.toLocaleString("en-US");
}

function normalizeVendor(vendor) {
  return {
    ...vendor,

    name:
      vendor.name ||
      vendor.vendorName ||
      vendor.companyName ||
      "Unnamed Vendor",

    category:
      vendor.category ||
      vendor.type ||
      vendor.vendorType ||
      "Other",

    phone:
      vendor.phone ||
      vendor.phoneNumber ||
      vendor.contactNumber ||
      "",

    eventDate:
      vendor.eventDate ||
      vendor.date ||
      vendor.bookingDate ||
      "",

    price:
      vendor.price ??
      vendor.cost ??
      vendor.amount ??
      0,

    status:
      vendor.status ||
      vendor.bookingStatus ||
      "Pending",

    notes: vendor.notes || "",
  };
}

export default function VendorsPage() {
  const { currentEvent } = useEvent();

  const eventId = currentEvent?._id;

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [selectedVendor, setSelectedVendor] =
    useState(null);

  const [showForm, setShowForm] = useState(false);

  const [editingVendor, setEditingVendor] =
    useState(null);

  const [form, setForm] = useState(emptyVendor);

  useEffect(() => {
    loadVendors();
  }, [eventId]);

  async function loadVendors() {
    if (!eventId) {
      setVendors([]);
      setError("");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/${eventId}`
      );

      if (!response.ok) {
        let message = `HTTP ${response.status}`;

        try {
          const data = await response.json();

          message =
            data.message ||
            data.error ||
            message;
        } catch {
          // Response was not JSON
        }

        throw new Error(message);
      }

      const result = await response.json();

      const rawVendors = Array.isArray(result)
        ? result
        : Array.isArray(result.vendors)
          ? result.vendors
          : [];

      setVendors(
        rawVendors.map(normalizeVendor)
      );
    } catch (err) {
      console.error(
        "Vendor loading error:",
        err
      );

      setError(
        err.message ||
          "Could not load vendors."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredVendors = useMemo(() => {
    const q = search
      .trim()
      .toLowerCase();

    return vendors.filter((vendor) => {
      const categoryMatches =
        activeCategory === "All" ||
        vendor.category?.toLowerCase() ===
          activeCategory.toLowerCase();

      const searchMatches =
        !q ||
        vendor.name
          ?.toLowerCase()
          .includes(q) ||
        vendor.category
          ?.toLowerCase()
          .includes(q) ||
        vendor.phone
          ?.toLowerCase()
          .includes(q);

      return (
        categoryMatches &&
        searchMatches
      );
    });
  }, [
    vendors,
    activeCategory,
    search,
  ]);

  const total = vendors.length;

  const booked = vendors.filter(
    (vendor) =>
      vendor.status?.toLowerCase() ===
      "booked"
  ).length;

  const pending = vendors.filter(
    (vendor) =>
      vendor.status?.toLowerCase() ===
      "pending"
  ).length;

  function openAddVendor() {
    if (!eventId) {
      alert(
        "Please select an active event before adding a vendor."
      );

      return;
    }

    setEditingVendor(null);
    setForm(emptyVendor);
    setShowForm(true);
  }

  function openEditVendor(vendor) {
    setEditingVendor(vendor);

    setForm({
      name: vendor.name || "",
      category:
        vendor.category || "Other",
      phone: vendor.phone || "",

      eventDate: vendor.eventDate
        ? vendor.eventDate.substring(
            0,
            10
          )
        : "",

      price:
        vendor.price ??
        "",

      status:
        vendor.status || "Pending",

      notes:
        vendor.notes || "",
    });

    setSelectedVendor(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingVendor(null);
    setForm(emptyVendor);
  }

  function changeForm(event) {
    const { name, value } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function saveVendor(event) {
    event.preventDefault();

    if (!eventId) {
      alert(
        "Please select an active event before saving a vendor."
      );

      return;
    }

    try {
      const editingId =
        editingVendor?._id ||
        editingVendor?.id;

      const payload = {
        type: form.category,
        name: form.name.trim(),
        phone: form.phone.trim(),
        price: Number(form.price),
        date: form.eventDate,
        status: form.status,
        notes: form.notes.trim(),
      };

      console.log(
        "Saving vendor:",
        payload
      );

      const url = editingVendor
        ? `${API_URL}/vendor/${editingId}`
        : `${API_URL}/${eventId}`;

      const response = await fetch(
        url,
        {
          method: editingVendor
            ? "PUT"
            : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      if (!response.ok) {
        let message =
          "Unable to save vendor";

        try {
          const data =
            await response.json();

          console.error(
            "Backend error:",
            data
          );

          message =
            data.message ||
            data.error ||
            message;
        } catch {
          // Response was not JSON
        }

        throw new Error(message);
      }

      const result =
        await response.json();

      console.log(
        "Vendor saved:",
        result
      );

      closeForm();

      await loadVendors();
    } catch (err) {
      console.error(
        "Vendor save error:",
        err
      );

      alert(
        err.message ||
          "Unable to save vendor."
      );
    }
  }

  async function deleteVendor(vendor) {
    const vendorId =
      vendor._id || vendor.id;

    if (!vendorId) {
      return;
    }

    const confirmed =
      window.confirm(
        `Delete ${vendor.name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/vendor/${vendorId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        let message =
          "Unable to delete vendor";

        try {
          const data =
            await response.json();

          message =
            data.message ||
            data.error ||
            message;
        } catch {
          // Response was not JSON
        }

        throw new Error(message);
      }

      setSelectedVendor(null);

      await loadVendors();
    } catch (err) {
      console.error(
        "Vendor delete error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete vendor."
      );
    }
  }

  return (
    <div className="vendors-screen">
      <div className="vendors-content">
        <div className="vendors-topbar">
          <div className="vendors-breadcrumb">
            <span>Event</span>
            <b>/</b>
            <strong>
              Vendors
            </strong>
          </div>
        </div>

        <section className="vendors-heading-row">
          <div>
            <div className="vendors-kicker">
              EVENT SERVICES
            </div>

            <h1>Vendors</h1>

            <p>
              Manage all service
              providers for your active
              event.
            </p>
          </div>

          <button
            type="button"
            className="vendors-add-btn"
            onClick={openAddVendor}
          >
            <span>＋</span>
            Add Vendor
          </button>
        </section>

        <div className="vendors-filter-row">
          {DEFAULT_CATEGORIES.map(
            (category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory ===
                  category
                    ? "vendors-filter active"
                    : "vendors-filter"
                }
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
              >
                {category}
              </button>
            )
          )}
        </div>

        <section className="vendors-stats">
          <div className="vendors-stat-card">
            <div className="vendors-stat-icon brown">
              <BriefcaseIcon />
            </div>

            <div>
              <span>
                Total Vendors
              </span>

              <strong>
                {total}
              </strong>
            </div>
          </div>

          <div className="vendors-stat-card">
            <div className="vendors-stat-icon green">
              <span className="vendors-check">
                ✓
              </span>
            </div>

            <div>
              <span>
                Booked
              </span>

              <strong>
                {booked}
              </strong>
            </div>
          </div>

          <div className="vendors-stat-card">
            <div className="vendors-stat-icon orange">
              <ClockIcon />
            </div>

            <div>
              <span>
                Pending
              </span>

              <strong>
                {pending}
              </strong>
            </div>
          </div>
        </section>

        <section className="vendors-board">
          <div className="vendors-board-header">
            <div>
              <h2>
                Vendor Cards
              </h2>

              <span>
                {
                  filteredVendors.length
                }{" "}
                result
                {filteredVendors.length ===
                1
                  ? ""
                  : "s"}
              </span>
            </div>

            <label className="vendors-search">
              <SearchIcon />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search vendors..."
              />
            </label>
          </div>

          {loading ? (
            <div className="vendors-empty-state">
              Loading vendors...
            </div>
          ) : error ? (
            <div className="vendors-empty-state">
              <h3>
                {error}
              </h3>

              <button
                type="button"
                onClick={
                  loadVendors
                }
              >
                Try Again
              </button>
            </div>
          ) : !eventId ? (
            <div className="vendors-empty-state">
              <BriefcaseIcon
                size={44}
              />

              <h3>
                No active event
              </h3>

              <p>
                Select an event from My
                Events before managing
                vendors.
              </p>
            </div>
          ) : filteredVendors.length ===
            0 ? (
            <div className="vendors-empty-state">
              <BriefcaseIcon
                size={44}
              />

              <h3>
                No vendors found
              </h3>

              <p>
                Try another filter or add
                a new vendor.
              </p>
            </div>
          ) : (
            <div className="vendors-card-grid">
              {filteredVendors.map(
                (vendor) => {
                  const id =
                    vendor._id ||
                    vendor.id ||
                    `${vendor.name}-${vendor.phone}`;

                  const isBooked =
                    vendor.status?.toLowerCase() ===
                    "booked";

                  return (
                    <article
                      className="vendors-card"
                      key={id}
                    >
                      <div className="vendors-card-top">
                        <div className="vendors-card-icon">
                          <BriefcaseIcon />
                        </div>

                        <div
                          className={
                            isBooked
                              ? "vendors-status booked"
                              : "vendors-status pending"
                          }
                        >
                          <i />

                          {vendor.status ||
                            "Pending"}
                        </div>
                      </div>

                      <div className="vendors-card-category">
                        {
                          vendor.category
                        }
                      </div>

                      <h3>
                        {vendor.name}
                      </h3>

                      <div className="vendors-card-meta">
                        {vendor.phone && (
                          <div className="vendors-phone">
                            {
                              vendor.phone
                            }
                          </div>
                        )}

                        <div>
                          <CalendarIcon />

                          <span>
                            {formatDate(
                              vendor.eventDate
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="vendors-card-price">
                        <strong>
                          {formatPrice(
                            vendor.price
                          )}
                        </strong>

                        {vendor.price !==
                          "" &&
                        vendor.price !==
                          null &&
                        vendor.price !==
                          undefined ? (
                          <span>
                            EGP
                          </span>
                        ) : null}
                      </div>

                      <div className="vendors-card-actions">
                        <button
                          type="button"
                          className="vendors-view-btn"
                          onClick={() =>
                            setSelectedVendor(
                              vendor
                            )
                          }
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          className="vendors-delete-btn"
                          onClick={() =>
                            deleteVendor(
                              vendor
                            )
                          }
                          aria-label="Delete vendor"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>

      {selectedVendor && (
        <div
          className="vendors-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedVendor(
                null
              );
            }
          }}
        >
          <div className="vendors-modal">
            <div className="vendors-modal-title">
              <div>
                <span>
                  VENDOR DETAILS
                </span>

                <h2>
                  {
                    selectedVendor.name
                  }
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedVendor(
                    null
                  )
                }
              >
                ×
              </button>
            </div>

            <div className="vendors-detail-grid">
              <div>
                <span>
                  Category
                </span>

                <strong>
                  {
                    selectedVendor.category
                  }
                </strong>
              </div>

              <div>
                <span>
                  Status
                </span>

                <strong>
                  {
                    selectedVendor.status
                  }
                </strong>
              </div>

              <div>
                <span>
                  Phone
                </span>

                <strong>
                  {selectedVendor.phone ||
                    "—"}
                </strong>
              </div>

              <div>
                <span>
                  Event Date
                </span>

                <strong>
                  {formatDate(
                    selectedVendor.eventDate
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Price
                </span>

                <strong>
                  {formatPrice(
                    selectedVendor.price
                  )}

                  {selectedVendor.price !==
                    "" &&
                  selectedVendor.price !==
                    null &&
                  selectedVendor.price !==
                    undefined
                    ? " EGP"
                    : ""}
                </strong>
              </div>
            </div>

            {selectedVendor.notes && (
              <div className="vendors-notes">
                <span>
                  Notes
                </span>

                <p>
                  {
                    selectedVendor.notes
                  }
                </p>
              </div>
            )}

            <div className="vendors-modal-actions">
              <button
                type="button"
                className="vendors-cancel-btn"
                onClick={() =>
                  setSelectedVendor(
                    null
                  )
                }
              >
                Close
              </button>

              <button
                type="button"
                className="vendors-add-btn"
                onClick={() =>
                  openEditVendor(
                    selectedVendor
                  )
                }
              >
                Edit Vendor
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div
          className="vendors-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeForm();
            }
          }}
        >
          <div className="vendors-modal">
            <div className="vendors-modal-title">
              <div>
                <span>
                  {editingVendor
                    ? "EDIT VENDOR"
                    : "NEW VENDOR"}
                </span>

                <h2>
                  {editingVendor
                    ? "Edit Vendor"
                    : "Add Vendor"}
                </h2>
              </div>

              <button
                type="button"
                onClick={
                  closeForm
                }
              >
                ×
              </button>
            </div>

            <form
              className="vendors-form"
              onSubmit={saveVendor}
            >
              <div className="vendors-form-grid">
                <label>
                  <span>
                    Vendor Name
                  </span>

                  <input
                    required
                    name="name"
                    value={
                      form.name
                    }
                    onChange={
                      changeForm
                    }
                  />
                </label>

                <label>
                  <span>
                    Category
                  </span>

                  <select
                    required
                    name="category"
                    value={
                      form.category
                    }
                    onChange={
                      changeForm
                    }
                  >
                    {DEFAULT_CATEGORIES.filter(
                      (category) =>
                        category !==
                        "All"
                    ).map(
                      (category) => (
                        <option
                          key={
                            category
                          }
                          value={
                            category
                          }
                        >
                          {
                            category
                          }
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label>
                  <span>
                    Phone
                  </span>

                  <input
                    required
                    name="phone"
                    value={
                      form.phone
                    }
                    onChange={
                      changeForm
                    }
                  />
                </label>

                <label>
                  <span>
                    Event Date
                  </span>

                  <input
                    required
                    type="date"
                    name="eventDate"
                    value={
                      form.eventDate
                    }
                    onChange={
                      changeForm
                    }
                  />
                </label>

                <label>
                  <span>
                    Price (EGP)
                  </span>

                  <input
                    required
                    type="number"
                    min="0"
                    name="price"
                    value={
                      form.price
                    }
                    onChange={
                      changeForm
                    }
                  />
                </label>

                <label>
                  <span>
                    Status
                  </span>

                  <select
                    name="status"
                    value={
                      form.status
                    }
                    onChange={
                      changeForm
                    }
                  >
                    <option value="Booked">
                      Booked
                    </option>

                    <option value="Pending">
                      Pending
                    </option>
                  </select>
                </label>
              </div>

              <label className="vendors-notes-field">
                <span>
                  Notes
                </span>

                <textarea
                  rows="4"
                  name="notes"
                  value={
                    form.notes
                  }
                  onChange={
                    changeForm
                  }
                />
              </label>

              <div className="vendors-modal-actions">
                <button
                  type="button"
                  className="vendors-cancel-btn"
                  onClick={
                    closeForm
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="vendors-add-btn"
                >
                  {editingVendor
                    ? "Save Changes"
                    : "Add Vendor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}