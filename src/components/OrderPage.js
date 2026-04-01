import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // If accessed directly without state, show error or redirect
  if (!state) {
    return (
      <div className="page-fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>No item selected</h2>
        <button className="premium-btn" style={{ marginTop: '1rem' }} onClick={() => navigate('/home')}>
          Browse Menu
        </button>
      </div>
    );
  }

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8089/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerName,
          foodName: state.name,
          quantity: Number(quantity)
        })
      });

      if (res.ok) {
        alert("🎉 Order placed successfully!");
        navigate("/home");
      } else {
        alert("Error placing order ❌");
      }
    } catch (err) {
      alert("Server connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = state.price * quantity;

  return (
    <div className="page-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="glass-panel form-container" style={{ margin: 0, width: '100%', maxWidth: '500px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'rgba(249, 115, 22, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.5rem',
            color: 'var(--accent)'
          }}>🛍️</div>
          <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem 0' }}>Checkout</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Complete your order details below.</p>
        </div>

        {/* Order Summary Card */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          border: '1px solid var(--glass-border)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{state.name}</span>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>₹{state.price}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: '1rem', borderTop: '1px dashed var(--glass-border)', paddingTop: '1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>₹{totalAmount}</span>
          </div>
        </div>

        <form onSubmit={handleOrder}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              className="premium-input"
              type="text"
              placeholder="Who is this order for?"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Quantity</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <button 
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem' }}
              >-</button>
              <input
                type="number"
                value={quantity}
                readOnly
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', textAlign: 'center', fontWeight: 'bold' }}
              />
              <button 
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem' }}
              >+</button>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="premium-btn" disabled={isLoading} style={{ padding: '16px', fontSize: '1.1rem' }}>
              {isLoading ? "Processing..." : `Pay ₹${totalAmount}`}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/home')}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                border: 'none',
                padding: '12px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              Cancel Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;