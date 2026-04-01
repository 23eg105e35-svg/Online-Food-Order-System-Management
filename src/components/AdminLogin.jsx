import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // In a real app with roles, we'd verify the role. For now we use the standard API but treat them as Admin in the frontend layout.
      const res = await fetch("http://localhost:8089/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const text = await res.text();
      
      if (res.ok && text) {
        let data;
        try { data = JSON.parse(text); } catch(e) { data = text; }
        
        if (data) {
          navigate("/admin");
          return;
        }
      }
      
      alert("Invalid Admin credentials ❌");
      
    } catch (err) {
      alert("Failed to connect to server - Ensure the backend is running!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-panel form-container" style={{ borderTop: '4px solid var(--primary)' }}>
        <div className="form-header">
          <h2 style={{ background: 'linear-gradient(135deg, #fff, #ef4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="premium-btn" disabled={isLoading} style={{ background: 'linear-gradient(135deg, #b91c1c, #991b1b)' }}>
              {isLoading ? "Authenticating..." : "Admin Login"}
            </button>
          </div>
        </form>

        <div className="auth-redirect">
          New staff member? <span onClick={() => navigate('/admin-register')} style={{ color: '#ef4444' }}>Register here</span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
