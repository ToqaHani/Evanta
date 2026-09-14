import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "../Login&Register.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    occasion: "Wedding",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
        occasion: "Wedding",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth auth--register">
      <div className="auth__form-side">
        <div className="auth__card">
          <img src={logo} alt="Evanta" className="auth__mobile-logo" />

          <span className="eyebrow">Let's begin</span>
          <h1>Create your Evanta account</h1>
          <p className="auth__subtitle">
            Your first smart plan is a few details away.
          </p>

          {error && <p className="auth__error">{error}</p>}
          {success && <p className="auth__success">{success}</p>}

          <form onSubmit={handleSubmit} className="auth__form">
            <label className="field">
              <span>Full name</span>
              <input
                type="text"
                name="name"
                placeholder="Yasmin Adel"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>What are you planning?</span>
              <select
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
              >
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Engagement</option>
                <option>Graduation</option>
                <option>Baby Shower</option>
              </select>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="field__password">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="field__toggle"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <label className="checkbox checkbox--terms">
              <input type="checkbox" required />
              <span>
                I agree to Evanta&apos;s <a href="#">Terms</a> and{" "}
                <a href="#">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth__switch">
            Already planning with us? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="auth__visual">
        <div className="auth__visual-overlay">
          <img src={logo} alt="Evanta" className="auth__visual-logo" />
          <p className="auth__visual-quote">
            &ldquo;Every detail, gathered in one graceful place.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
