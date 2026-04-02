import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminIsLoggedIn") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const storedAdmin = JSON.parse(localStorage.getItem("adminUser"));

    if (!storedAdmin) {
      setError("No registered admin found");
      setIsLoading(false);
      return;
    }

    if (storedAdmin.email === email && storedAdmin.password === password) {
      localStorage.setItem("adminIsLoggedIn", "true");
      setError("");
      navigate("/admin");
      return;
    }

    setError("Invalid email or password");
    setIsLoading(false);
  };

  return (
    <div className="page-fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
      <div className="glass-panel form-container" style={{ borderTop: "4px solid var(--primary)" }}>
        <div className="form-header">
          <h2 style={{ background: "linear-gradient(135deg, #fff, #ef4444)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Staff Portal
          </h2>
          <p>Login to manage inventory and orders.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Staff Email</label>
            <input
              className="premium-input"
              type="email"
              placeholder="admin@restaurant.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              className="premium-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          {error && <p style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</p>}

          <div className="form-actions">
            <button type="submit" className="premium-btn" disabled={isLoading} style={{ background: "linear-gradient(135deg, #b91c1c, #991b1b)" }}>
              {isLoading ? "Authenticating..." : "Admin Login"}
            </button>
          </div>
        </form>

        <div className="auth-redirect">
          New staff member? <span onClick={() => navigate("/admin-register")} style={{ color: "#ef4444" }}>Register here</span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
