import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Icon from "./Icons";
import { useEvent } from "../../context/EventContext";

import "./sidebar.css";

const links = [
  {
    label: "Dashboard",
    icon: "grid",
    path: "/dashboard",
  },
  {
    label: "Guests",
    icon: "users",
    path: "/guests",
  },
  {
    label: "Budget",
    icon: "wallet",
    path: "/budget",
  },
  {
    label: "Tasks",
    icon: "checkSquare",
    path: "/tasks",
  },
  {
    label: "Vendors",
    icon: "briefcase",
    path: "/vendors",
  },
  {
    label: "Invitations",
    icon: "mail",
    path: "/invitations",
  },
];

const formatEventDate = (date) => {
  if (!date) {
    return "No date";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "No date";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Sidebar({
  mobileOpen = false,
  onClose = () => {},
}) {
  const navigate = useNavigate();
  const { currentEvent } = useEvent();

  const handleSwitchEvent = () => {
    onClose();
    navigate("/my-events");
  };

  return (
    <>
      <div
        className={`evanta-sidebar-backdrop ${
          mobileOpen ? "show" : ""
        }`}
        onClick={onClose}
      />

      <aside
        className={`evanta-sidebar ${
          mobileOpen ? "open" : ""
        }`}
      >
        {/* LOGO */}
        <div className="evanta-sidebar-brand">
          <img
            className="evanta-sidebar-logo"
            src="/assets/evanta-logo.png"
            alt="Evanta Event Planner"
          />
        </div>

        {/* ACTIVE EVENT */}
        <div className="evanta-sidebar-event">
          <div className="evanta-sidebar-eyebrow">
            ACTIVE EVENT
          </div>

          {currentEvent ? (
            <>
              <strong>
                {currentEvent.name || "Unnamed Event"}
              </strong>

              <span>
                {currentEvent.type || "Event"}
              </span>

              <span>
                {formatEventDate(currentEvent.date)}
              </span>
            </>
          ) : (
            <>
              <strong>No active event</strong>

              <span>
                Select or create an event
              </span>
            </>
          )}

          <button
            className="evanta-sidebar-switch"
            type="button"
            onClick={handleSwitchEvent}
          >
            <Icon name="repeat" size={15} />
            Switch Event
          </button>
        </div>

        {/* MAIN NAVIGATION */}
        <nav
          className="evanta-sidebar-nav"
          aria-label="Event navigation"
        >
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `evanta-sidebar-nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon name={item.icon} />

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="evanta-sidebar-divider" />

        {/* MY EVENTS */}
        <NavLink
          to="/my-events"
          onClick={onClose}
          className={({ isActive }) =>
            `evanta-sidebar-nav-item ${
              isActive ? "active" : ""
            }`
          }
        >
          <Icon name="calendar" />
          <span>My Events</span>
        </NavLink>

        <div className="evanta-sidebar-spacer" />
      </aside>
    </>
  );
}