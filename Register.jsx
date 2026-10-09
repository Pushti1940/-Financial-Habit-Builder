import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    // Save login information returned by backend
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    alert("Account created successfully!");

    navigate("/dashboard");

  } catch (error) {
    console.error("Registration error:", error);

    alert(
      "Cannot connect to server. Make sure the backend is running."
    );
  }
};

  return (
    <main className="register-page">

      {/* LEFT SIDE */}

      <section className="register-visual">

        <div className="register-brand">
          <div className="register-brand-logo">F</div>
          <span>Finova</span>
        </div>

        <div className="register-visual-content">

          <p className="register-eyebrow">
            START YOUR FINANCIAL JOURNEY
          </p>

          <h1>
            Build better
            <span> money habits.</span>
          </h1>

          <p className="register-description">
            Track your spending, build savings goals,
            manage investments and grow your financial
            confidence with Finova.
          </p>

          <div className="register-feature">
            <div className="register-feature-icon">✓</div>

            <div>
              <h3>Everything in one place</h3>
              <p>Manage your complete financial journey.</p>
            </div>
          </div>

          <div className="register-feature">
            <div className="register-feature-icon">↗</div>

            <div>
              <h3>Track your progress</h3>
              <p>See how your financial habits improve.</p>
            </div>
          </div>

        </div>

        <div className="register-footer">
          <span>© 2026 Finova</span>
          <span>Financial Habit Builder</span>
        </div>

      </section>

      {/* RIGHT SIDE */}

      <section className="register-form-section">

        <div className="register-form-container">

          <div className="register-mobile-brand">
            <div className="register-brand-logo">F</div>
            <span>Finova</span>
          </div>

          <div className="register-heading">

            <p>GET STARTED</p>

            <h2>Create your account.</h2>

            <span>
              Start building better financial habits today.
            </span>

          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="register-field">

              <label htmlFor="name">
                Full name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />

            </div>

            {/* EMAIL */}

            <div className="register-field">

              <label htmlFor="register-email">
                Email address
              </label>

              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="register-field">

              <label htmlFor="register-password">
                Password
              </label>

              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                minLength="6"
                required
              />

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="register-field">

              <label htmlFor="confirm-password">
                Confirm password
              </label>

              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
                minLength="6"
                required
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="register-submit-button"
            >
              <span>Create account</span>
              <span>→</span>
            </button>

          </form>

          <p className="register-login-text">
            Already have an account?

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>

        </div>

      </section>

    </main>
  );
}

export default Register;