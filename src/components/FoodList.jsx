import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFoodImage } from "../utils/imageMapper";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  if (isLoading) {
    return (
      <div className="page-fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ color: 'var(--text-muted)' }}>Loading menu...</h2>
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <h1>Discover Delicious Food</h1>
        <p>Explore our menu and order your favorites.</p>
      </div>

      {foods.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'var(--glass-bg)', borderRadius: '16px' }}>
          <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Menu is empty</h2>
          <p style={{ color: 'var(--text-muted)' }}>No items available right now.</p>
        </div>
      ) : (
        <div className="food-grid">
          {foods.map((food) => (
            <div key={food.id} className="glass-panel" style={{ 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}>
              
              <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={getFoodImage(food.name, food.imageUrl)}
                  alt={food.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  color: 'var(--accent)',
                  border: '1px solid rgba(249, 115, 22, 0.3)'
                }}>
                  ₹{food.price}
                </div>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{food.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                  Freshly prepared and delivered hot to your doorstep.
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                  <button
                    className="premium-btn"
                    style={{ flex: 1 }}
                    onClick={() =>
                      navigate("/orders", {
                        state: { name: food.name, price: food.price },
                      })
                    }
                  >
                    Order Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodList;