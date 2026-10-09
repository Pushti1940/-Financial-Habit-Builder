import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Cannot connect to server. Make sure the backend is running."
      );
    }
  };

  return (
    <main className="login-page">

      {/* LEFT SIDE */}
      <section className="login-visual">

        <div className="login-brand">
          <div className="login-brand-logo">F</div>
          <span>Finova</span>
        </div>

        <div className="login-visual-content">

          <p className="login-eyebrow">
            PERSONAL FINANCE, SIMPLIFIED
          </p>

          <h1>
            Make your money
            <span> work for you.</span>
          </h1>

          <p className="login-description">
            Build better financial habits, stay on top of
            your spending, reach your goals and watch your
            wealth grow.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <div className="login-feature-icon">↗</div>

              <div>
                <h3>Track your growth</h3>
                <p>
                  See where your money goes and how it grows.
                </p>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">✓</div>

              <div>
                <h3>Build better habits</h3>
                <p>
                  Turn small actions into consistent progress.
                </p>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">◎</div>

              <div>
                <h3>Reach your goals</h3>
                <p>
                  Stay focused on the financial future you want.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="login-footer">
          <span>© 2026 Finova</span>
          <span>Financial Habit Builder</span>
        </div>

      </section>

      {/* RIGHT SIDE */}
      <section className="login-form-section">

        <div className="login-form-container">

          <div className="mobile-login-brand">
            <div className="login-brand-logo">F</div>
            <span>Finova</span>
          </div>

          <div className="login-heading">

            <p>WELCOME BACK</p>

            <h2>Welcome back.</h2>

            <span>
              Sign in to continue your financial journey.
            </span>

          </div>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="login-field">

              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="login-field">

              <div className="login-password-header">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

            </div>

            {/* REMEMBER ME */}
            <label className="remember-login">

              <input type="checkbox" />

              <span>
                Keep me signed in
              </span>

            </label>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-submit-button"
            >
              <span>Sign in</span>

              <span className="login-arrow">
                →
              </span>
            </button>

          </form>

          {/* REGISTER */}
          <p className="login-register-text">

            Don't have an account?

            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Create one
            </button>

          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;