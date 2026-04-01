import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch("http://localhost:8089/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      alert("Admin registration successful!");
      navigate("/admin-login");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-panel form-container" style={{ borderTop: '4px solid var(--primary)' }}>
        <div className="form-header">
          <h2 style={{ background: 'linear-gradient(135deg, #fff, #ef4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Admin Setup
          </h2>
          <p>Register a new staff account.</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Manager Name</label>
            <input
              className="premium-input"
              type="text"
              placeholder="John Staff"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Official Email</label>
            <input
              className="premium-input"
              type="email"
              placeholder="admin@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Secure Password</label>
            <input
              className="premium-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="premium-btn" disabled={isLoading} style={{ background: 'linear-gradient(135deg, #b91c1c, #991b1b)' }}>
              {isLoading ? "Registering..." : "Create Admin Account"}
            </button>
          </div>
        </form>

        <div className="auth-redirect">
          Already have staff access? <span onClick={() => navigate('/admin-login')} style={{ color: '#ef4444' }}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
