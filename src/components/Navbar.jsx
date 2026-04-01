import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  if (isAuthPage) return null; // Hide navbar on login/register pages

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--glass-border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 2rem',
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
        <span style={{ fontSize: '1.8rem' }}>🍔</span> Foodie<span style={{ color: 'var(--accent)' }}>.</span>
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/home" style={{ fontWeight: 600, color: 'var(--text-main)', transition: 'color 0.2s', ':hover': { color: 'var(--accent)' }}}>Home</Link>
        <Link to="/orders" style={{ fontWeight: 600, color: 'var(--text-muted)', transition: 'color 0.2s' }}>Orders</Link>
        <Link to="/admin-login" style={{ fontWeight: 600, color: 'var(--text-muted)', transition: 'color 0.2s' }}>Admin</Link>
        <Link to="/" style={{ 
          marginLeft: '1rem',
          padding: '8px 16px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          fontWeight: 600,
          color: 'var(--text-main)',
          border: '1px solid var(--glass-border)',
          transition: 'all 0.2s'
        }}>Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;