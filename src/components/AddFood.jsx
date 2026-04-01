import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFood() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddFood = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8089/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          imageUrl
        })
      });

      if (response.ok) {
        navigate("/home");
      } else {
        alert("❌ Failed to add food");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="glass-panel form-container" style={{ margin: 0, width: '100%' }}>
        <div className="form-header">
          <h2>Add New Item</h2>
          <p>Expand your menu with a new delicious dish.</p>
        </div>

        <form onSubmit={handleAddFood}>
          <div className="input-group">
            <label>Food Name</label>
            <input
              className="premium-input"
              type="text"
              placeholder="e.g. Spicy Pepperoni Pizza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Price (₹)</label>
            <input
              className="premium-input"
              type="number"
              placeholder="e.g. 299"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="input-group">
            <label>Image URL (Optional)</label>
            <input
              className="premium-input"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="premium-btn" disabled={isLoading}>
              {isLoading ? "Adding Item..." : "Add to Menu"}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/home')}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid var(--glass-border)',
                padding: '12px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFood;