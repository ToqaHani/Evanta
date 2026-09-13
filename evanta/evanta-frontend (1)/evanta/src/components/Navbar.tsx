import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="evanta-nav">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <span className="evanta-logo">
          EVANTA
          <span className="evanta-logo-dot" />
        </span>

        <Link
          to="/my-events"
          activeProps={{ className: "evanta-link active" }}
          inactiveProps={{ className: "evanta-link" }}
        >
          My Events
        </Link>
      </div>
    </nav>
  );
}
