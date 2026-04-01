import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SmartFeatures() {
  const [foods, setFoods] = useState([]);
  const [randomFood, setRandomFood] = useState(null);
  const [selectedMood, setSelectedMood] = useState("");
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const navigate = useNavigate();

  // ✅ Fetch food from backend
  useEffect(() => {
    fetch("http://localhost:8089/food")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.log(err));
  }, []);

  // 🎲 Surprise Me
  const surpriseMe = () => {
    if (foods.length === 0) {
      alert("No food available");
      return;
    }

    const random = foods[Math.floor(Math.random() * foods.length)];
    setRandomFood(random);
  };

  // 😊 Mood Data
  const moodFoods = {
    happy: ["Pizza 🍕", "Ice Cream 🍨"],
    sad: ["Chocolate 🍫", "Coffee ☕"],
    tired: ["Sandwich 🥪", "Tea 🍵"],
    party: ["Burger 🍔", "Fries 🍟", "Cold Drink 🥤"]
  };

  // 🧠 Meal Planner
  const generateMeal = () => {
    const b = Number(budget);
    const p = Number(people);

    if (!b || !p) {
      alert("Enter budget and people count");
      return;
    }

    if (b <= 200) {
      setSuggestion(["Burger 🍔", "Fries 🍟"]);
    } else if (b <= 500) {
      setSuggestion(["Pizza 🍕", "Fries 🍟", "Cold Drink 🥤"]);
    } else {
      setSuggestion(["Combo Meal 🍱", "Dessert 🍰", "Drinks 🥤"]);
    }
  };

  return (
    <div className="smart-container">
      <h2>✨ Smart Features</h2>

      {/* 🎲 Surprise Me */}
      <div className="smart-card">
        <h3>🎲 Surprise Me</h3>
        <button onClick={surpriseMe}>Get Random Food</button>

        {randomFood && (
          <div>
            <h4>{randomFood.name}</h4>
            <p>₹{randomFood.price}</p>

            <button
              onClick={() =>
                navigate("/order", {
                  state: {
                    name: randomFood.name,
                    price: randomFood.price
                  }
                })
              }
            >
              Order Now
            </button>
          </div>
        )}
      </div>

      {/* 😊 Mood Feature */}
      <div className="smart-card">
        <h3>😊 Mood-Based Food</h3>

        <select onChange={(e) => setSelectedMood(e.target.value)}>
          <option value="">Select Mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="tired">Tired</option>
          <option value="party">Party</option>
        </select>

        {selectedMood && (
          <ul>
            {moodFoods[selectedMood].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* 🧠 Meal Planner */}
      <div className="smart-card">
        <h3>🧠 Smart Meal Planner</h3>

        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Number of People"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />

        <button onClick={generateMeal}>Suggest Meal</button>

        <ul>
          {suggestion.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SmartFeatures;