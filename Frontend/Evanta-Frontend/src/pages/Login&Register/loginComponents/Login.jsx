import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "../Auth.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          rememberMe: form.rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (form.rememberMe) {
        localStorage.setItem("evantaToken", data.token);
      } else {
        sessionStorage.setItem("evantaToken", data.token);
      }

      localStorage.setItem("evantaUser", JSON.stringify(data.user));

      setSuccess("Login successful!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <div className="auth__visual">
        <div className="auth__visual-overlay">
          <img src={logo} alt="Evanta" className="auth__visual-logo" />
          <p className="auth__visual-quote">
            &ldquo;Plan Beautifully, Celebrate Fully.&rdquo;
          </p>
        </div>
      </div>

      <div className="auth__form-side">
        <div className="auth__card">
          <img src={logo} alt="Evanta" className="auth__mobile-logo" />

          <span className="eyebrow">Welcome back</span>
          <h1>Sign in to Evanta</h1>
          <p className="auth__subtitle">
            Pick up right where you left off planning.
          </p>

          {error && <p className="auth__error">{error}</p>}
          {success && <p className="auth__success">{success}</p>}

          <form onSubmit={handleSubmit} className="auth__form">
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
              <span>Password</span>
              <div className="field__password">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
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

            <div className="auth__row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      rememberMe: e.target.checked,
                    }))
                  }
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="auth__link">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="auth__switch">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
