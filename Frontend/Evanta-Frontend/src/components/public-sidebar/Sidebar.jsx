import React from "react";
import Icon from "./Icons";
import "./sidebar.css";

const links = [
  ["Dashboard", "grid"],
  ["Guests", "users"],
  ["Budget", "wallet"],
  ["Tasks", "checkSquare"],
  ["Vendors", "briefcase"],
  ["Invitations", "mail"],
];

export default function Sidebar({
  mobileOpen = false,
  onClose = () => {},
  active = "Dashboard",
}) {
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
        <div className="evanta-sidebar-brand">
          <img
            className="evanta-sidebar-logo"
            src="/assets/evanta-logo.png"
            alt="Evanta Event Planner"
          />
        </div>

        <div className="evanta-sidebar-event">
          <div className="evanta-sidebar-eyebrow">
            ACTIVE EVENT
          </div>

          <strong>Toka & Ahmed</strong>

          <span>Engagement</span>
          <span>20 Sep 2026</span>

          <button
            className="evanta-sidebar-switch"
            type="button"
          >
            <Icon name="repeat" size={15} />
            Switch Event
          </button>
        </div>

        <nav
          className="evanta-sidebar-nav"
          aria-label="Event navigation"
        >
          {links.map(([label, icon]) => (
            <a
              key={label}
              className={`evanta-sidebar-nav-item ${
                active === label ? "active" : ""
              }`}
              href={`#${label.toLowerCase()}`}
              onClick={onClose}
            >
              <Icon name={icon} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="evanta-sidebar-divider" />

        <a
          className="evanta-sidebar-nav-item"
          href="#my-events"
          onClick={onClose}
        >
          <Icon name="calendar" />
          <span>My Events</span>
        </a>

        <a
          className="evanta-sidebar-nav-item"
          href="#settings"
          onClick={onClose}
        >
          <Icon name="activity" />
          <span>Event Settings</span>
        </a>

        <div className="evanta-sidebar-spacer" />

        <a
          className="evanta-sidebar-nav-item"
          href="#profile"
          onClick={onClose}
        >
          <Icon name="user" />
          <span>Profile</span>
        </a>

        <a
          className="evanta-sidebar-nav-item evanta-sidebar-logout"
          href="#logout"
          onClick={onClose}
        >
          <Icon name="logout" />
          <span>Logout</span>
        </a>
      </aside>
    </>
  );
}