import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFoodImage } from "../utils/imageMapper";

const defaultMenuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 249,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
    description: "Classic pizza with mozzarella, basil, and rich tomato sauce.",
    category: "Veg"
  },
  {
    id: 2,
    name: "Chicken Burger",
    price: 189,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    description: "Juicy chicken patty with crisp lettuce, cheese, and smoky mayo.",
    category: "Non-Veg"
  },
  {
    id: 3,
    name: "Paneer Tikka Wrap",
    price: 169,
    image: "https://images.unsplash.com/photo-1669284678829-f5b0b85e34a3?auto=format&fit=crop&w=900&q=80",
    description: "Soft wrap loaded with spicy paneer tikka, onions, and mint sauce.",
    category: "Veg"
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 99,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    description: "Chilled coffee blended smooth with milk and a hint of chocolate.",
    category: "Drinks"
  },
  {
    id: 5,
    name: "French Fries",
    price: 129,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80",
    description: "Golden, crispy fries tossed with seasoning and served hot.",
    category: "Snacks"
  },
  {
    id: 6,
    name: "Grilled Chicken Bowl",
    price: 279,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    description: "Protein-packed bowl with grilled chicken, rice, and fresh veggies.",
    category: "Non-Veg"
  }
];

const categories = ["All", "Veg", "Non-Veg", "Drinks", "Snacks"];

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMenu = localStorage.getItem("foodMenu");
    const parsedMenu = storedMenu ? JSON.parse(storedMenu) : defaultMenuItems;

    if (!storedMenu) {
      localStorage.setItem("foodMenu", JSON.stringify(defaultMenuItems));
    }

    setMenuItems(parsedMenu);
    setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);

    fetch("http://localhost:8089/food")
      .then((res) => res.json())
      .then((data) => {
        setFoods(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, searchTerm, selectedCategory]);

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, item];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
    alert("Item added to cart");
  };

  if (isLoading) {
    return (
      <div className="page-fade-in" style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2 style={{ color: "var(--text-muted)" }}>Loading menu...</h2>
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <h1>Discover Delicious Food</h1>
        <p>Explore our menu and order your favorites.</p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: "1rem 1.25rem",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Cart</h3>
          <p style={{ margin: "0.35rem 0 0", color: "var(--text-muted)" }}>Your selected items stay saved after refresh.</p>
        </div>
        <div
          style={{
            minWidth: "56px",
            height: "56px",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(249, 115, 22, 0.14)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            color: "var(--accent)",
            fontSize: "1.1rem",
            fontWeight: 800
          }}
        >
          {cartCount}
        </div>
      </div>

      {foods.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "4rem", padding: "3rem", background: "var(--glass-bg)", borderRadius: "16px" }}>
          <h2 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Menu is empty</h2>
          <p style={{ color: "var(--text-muted)" }}>No items available right now.</p>
        </div>
      ) : (
        <div className="food-grid">
          {foods.map((food) => (
            <div
              key={food.id}
              className="glass-panel"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
            >
              <div style={{ position: "relative", height: "220px", width: "100%", overflow: "hidden" }}>
                <img
                  src={getFoodImage(food.name, food.imageUrl)}
                  alt={food.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(8px)",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontWeight: "700",
                    color: "var(--accent)",
                    border: "1px solid rgba(249, 115, 22, 0.3)"
                  }}
                >
                  ₹{food.price}
                </div>
              </div>

              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem" }}>{food.name}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem", flex: 1 }}>
                  Freshly prepared and delivered hot to your doorstep.
                </p>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                  <button
                    className="premium-btn"
                    style={{ flex: 1 }}
                    onClick={() =>
                      navigate("/orders", {
                        state: { name: food.name, price: food.price }
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

      <section style={{ marginTop: "3rem" }}>
        <div className="page-header" style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "2rem" }}>Food Menu</h1>
          <p>Handpicked favorites in a modern, easy-to-browse menu.</p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: "1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <input
            className="premium-input"
            type="text"
            placeholder="Search food menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "360px", margin: 0 }}
          />

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "999px",
                  border: selectedCategory === category ? "1px solid rgba(249, 115, 22, 0.45)" : "1px solid var(--glass-border)",
                  background: selectedCategory === category ? "rgba(249, 115, 22, 0.18)" : "rgba(15, 23, 42, 0.45)",
                  color: selectedCategory === category ? "var(--accent)" : "var(--text-main)",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {filteredMenuItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                overflow: "hidden",
                borderRadius: "22px",
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
                boxShadow: "var(--shadow-md)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
            >
              <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "1rem",
                    bottom: "1rem",
                    padding: "0.45rem 0.85rem",
                    borderRadius: "999px",
                    background: "rgba(15, 23, 42, 0.78)",
                    color: "#fff",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em"
                  }}
                >
                  {item.category}
                </div>
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1.15rem" }}>{item.name}</h3>
                  <span style={{ color: "var(--accent)", fontWeight: 800, whiteSpace: "nowrap" }}>₹{item.price}</span>
                </div>

                <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.6, fontSize: "0.95rem", flex: 1 }}>
                  {item.description}
                </p>

                <button
                  type="button"
                  className="premium-btn"
                  style={{ marginTop: "1.25rem", width: "100%" }}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="glass-panel" style={{ marginTop: "1.5rem", padding: "2rem", textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>No menu items found</h3>
            <p style={{ marginBottom: 0, color: "var(--text-muted)" }}>Try a different search or category filter.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default FoodList;
