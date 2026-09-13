import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "../Footer.css";

export default function Footer() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <footer className="footer footer--minimal">
        <p>
          &copy; {new Date().getFullYear()} Evanta. Plan beautifully, celebrate
          fully.
        </p>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="Evanta" className="footer__logo" />
          <p>
            Every celebration deserves a plan as beautiful as the moment itself.
            Weddings, birthdays, engagements and everything worth toasting to —
            Evanta keeps it effortless.
          </p>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#why">Why Evanta</a>
            </li>
            <li>
              <a href="#testimonials">Love Notes</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Account</h4>
          <ul>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/register">Create account</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Occasions</h4>
          <ul>
            <li>Weddings</li>
            <li>Birthdays</li>
            <li>Engagements</li>
            <li>Baby Showers</li>
          </ul>
        </div>
      </div>

      <div className="divider" style={{ margin: "28px auto" }}>
        <span className="line" />
        <span className="spark" />
        <span className="line" />
      </div>

      <p className="footer__bottom">
        &copy; {new Date().getFullYear()} Evanta. All rights reserved.
      </p>
    </footer>
  );
}
