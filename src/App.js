import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import FoodList from "./components/FoodList";
import AddFood from "./components/AddFood";
import OrderPage from "./components/OrderPage";
import AdminDashboard from "./components/AdminDashboard";
import SmartFeatures from "./components/SmartFeatures";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function AdminProtectedRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("adminIsLoggedIn") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

function AdminPublicRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("adminIsLoggedIn") === "true";

  if (isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    localStorage.getItem("isLoggedIn");
    localStorage.getItem("adminIsLoggedIn");
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/admin-login"
              element={
                <AdminPublicRoute>
                  <AdminLogin />
                </AdminPublicRoute>
              }
            />
            <Route
              path="/admin-register"
              element={
                <AdminPublicRoute>
                  <AdminRegister />
                </AdminPublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <FoodList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddFood />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/smart"
              element={
                <ProtectedRoute>
                  <SmartFeatures />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
