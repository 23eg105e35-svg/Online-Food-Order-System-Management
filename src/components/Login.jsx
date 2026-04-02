import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No registered user found");
      setIsLoading(false);
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/home");
      return;
    }

    setError("Invalid email or password");
    setIsLoading(false);
  };

  return (
    <div className="page-fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
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
            <button type="submit" className="premium-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="auth-redirect">
          Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
