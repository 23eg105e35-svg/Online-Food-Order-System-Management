import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFoodImage } from "../utils/imageMapper";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("inventory"); // "inventory" or "orders"
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch foods
  const loadInventory = () => {
    setIsLoading(true);
    fetch("http://localhost:8089/food")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  // Fetch orders
  const loadOrders = () => {
    setIsLoading(true);
    fetch("http://localhost:8089/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Orders API probably not implemented as GET");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders (Might not be supported by backend yet)", err);
        setOrders([]); // Fallback
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (activeTab === "inventory") {
      loadInventory();
    } else {
      loadOrders();
    }
  }, [activeTab]);

  const deleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this item?")) return;

    try {
      await fetch(`http://localhost:8089/food/${id}`, {
        method: "DELETE",
      });
      setFoods(foods.filter((food) => food.id !== id));
    } catch (error) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="page-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
          <p>Manage your restaurant menu items and incoming orders.</p>
        </div>
        <button 
          className="premium-btn" 
          onClick={() => navigate('/add')}
          style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid var(--glass-border)', boxShadow: 'none' }}
        >
          ➕ Add New Item
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            padding: '10px 24px',
            borderRadius: '20px',
            border: activeTab === 'inventory' ? '1px solid var(--accent)' : '1px solid transparent',
            background: activeTab === 'inventory' ? 'rgba(249, 115, 22, 0.1)' : 'var(--glass-bg)',
            color: activeTab === 'inventory' ? 'var(--accent)' : 'var(--text-muted)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          🍔 Inventory Menu
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 24px',
            borderRadius: '20px',
            border: activeTab === 'orders' ? '1px solid var(--accent)' : '1px solid transparent',
            background: activeTab === 'orders' ? 'rgba(249, 115, 22, 0.1)' : 'var(--glass-bg)',
            color: activeTab === 'orders' ? 'var(--accent)' : 'var(--text-muted)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          📦 Incoming Orders
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', minHeight: '400px', overflowX: 'auto' }}>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2 style={{ color: 'var(--text-muted)' }}>Loading {activeTab}...</h2>
          </div>
        ) : activeTab === 'inventory' ? (
          /* INVENTORY VIEW */
          foods.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: 'var(--text-main)' }}>No Food Items Found</h3>
              <p style={{ color: 'var(--text-muted)' }}>Click 'Add New Item' to expand your menu.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Item</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Price</th>
                  <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={getFoodImage(food.name, food.imageUrl)} alt={food.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--text-main)' }}>{food.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>₹{food.price}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => deleteFood(food.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          /* ORDERS VIEW */
          orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
              <h3 style={{ color: 'var(--text-main)' }}>No Orders Yet</h3>
              <p style={{ color: 'var(--text-muted)' }}>When customers place orders, they will appear here.</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>If you keep seeing this, ensure the backend supports `GET /orders`.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Order ID</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Customer Name</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Food Ordered</th>
                  <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'center' }}>Qty</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order.id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>#{order.id || (idx + 1000)}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{order.customerName}</td>
                    <td style={{ padding: '1rem', color: 'var(--accent)' }}>{order.foodName}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '12px' }}>{order.quantity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
