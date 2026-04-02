import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
      <div className="glass-panel form-container">
        <div className="form-header">
          <h2>Create Account</h2>
          <p>Join Foodie and start ordering delicious meals.</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              className="premium-input"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="auth-redirect">
          Already have an account? <span onClick={() => navigate("/")}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
