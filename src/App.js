import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-register" element={<AdminRegister />} />

            {/* App Routes */}
            <Route path="/home" element={<FoodList />} />
            <Route path="/add" element={<AddFood />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/smart" element={<SmartFeatures />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;