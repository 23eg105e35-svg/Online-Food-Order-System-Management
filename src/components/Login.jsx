import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
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
          navigate("/home");
          return;
        }
      }
      
      alert("Invalid credentials ❌");
      
    } catch (err) {
      alert("Failed to connect to server - Ensure backend is running!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-panel form-container">
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p>Enter your details to access your foodie account.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              className="premium-input"
              type="email"
              placeholder="name@example.com"
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
            <button type="submit" className="premium-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="auth-redirect">
          Don't have an account? <span onClick={() => navigate('/register')}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;