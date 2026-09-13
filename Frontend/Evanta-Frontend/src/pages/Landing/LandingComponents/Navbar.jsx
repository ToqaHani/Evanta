import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "../Navbar.css";

const NAV_LINKS = [
  { label: "Home", hash: "#home" },
  { label: "Features", hash: "#features" },
  { label: "Why Evanta", hash: "#why" },
  { label: "Love Notes", hash: "#testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Evanta home">
          <img src={logo} alt="Evanta" className="navbar__logo" />
        </Link>

        {!isAuthPage && (
          <nav className={`navbar__links ${open ? "is-open" : ""}`}>
            {NAV_LINKS.map((item) => (
              <a
                key={item.hash}
                href={item.hash}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="navbar__links-actions">
              <NavLink to="/login" className="btn btn-ghost">
                Sign in
              </NavLink>
              <NavLink to="/register" className="btn btn-primary">
                Start planning
              </NavLink>
            </div>
          </nav>
        )}

        {!isAuthPage && (
          <button
            className={`navbar__burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        )}

        {isAuthPage && (
          <Link to="/" className="navbar__back">
            &larr; Back to home
          </Link>
        )}
      </div>
    </header>
  );
}
