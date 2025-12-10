import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Determine if shop is open
const hour = new Date().getHours();
const openHour = 10;
const closeHour = 20;
const isOpen = hour >= openHour && hour < closeHour;

// Header component
function Header() {
  return (
    <header className="header">
      <h1
        style={{
          color: "pink",
          fontSize: "48px",
          textTransform: "uppercase",
        }}
      >
        Kai Wen’s Pizza Co.
      </h1>
      {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
    </header>
  );
}

// Pizza data array
const pizzas = [
  { 
    name: "Focaccia", 
    ingredients: "Bread with italian olive oil and rosemary", 
    price: 6, 
    photoName: "/pizzas/focaccia.jpg", 
    soldOut: false 
  },
  { 
    name: "Pizza Funghi", 
    ingredients: "Tomato, mozarella, mushrooms, and onion", 
    price: 12, 
    photoName: "/pizzas/funghi.jpg", 
    soldOut: false 
  },
  { 
    name: "Pizza Margherita", 
    ingredients: "Tomato and mozarella", 
    price: 10, 
    photoName: "/pizzas/margherita.jpg", 
    soldOut: false 
  },
  { 
    name: "Pizza Prosciutto", 
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese", 
    price: 18, 
    photoName: "/pizzas/prosciutto.jpg", 
    soldOut: false 
  },
  { 
    name: "Pizza Salamino", 
    ingredients: "Tomato, mozarella, and pepperoni", 
    price: 15, 
    photoName: "/pizzas/salamino.jpg", 
    soldOut: true 
  },
  { 
    name: "Pizza Spinaci", 
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese", 
    price: 12, 
    photoName: "/pizzas/spinaci.jpg", 
    soldOut: false 
  },
];


// Pizza component
function Pizza({ name, ingredients, price, photoName, isFavourite, toggleFavourite }) {
  return (
    <div className={`pizza ${isFavourite ? "favourite" : ""}`}>
      <img src={photoName} alt={name} />
      <h3>{name}</h3>
      <p className="ingredients">{ingredients}</p>
      <p className="price">${price}</p>
      <button onClick={() => toggleFavourite(name)}>
        {isFavourite ? "★ Favourite" : "☆ Add to Favourites"}
      </button>
    </div>
  );
}

// Menu component
function Menu() {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (pizzaName) => {
    setFavourites((prev) =>
      prev.includes(pizzaName)
        ? prev.filter((name) => name !== pizzaName)
        : [...prev, pizzaName]
    );
  };

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <div className="pizza-grid">
        {pizzas.map((pizza) => (
          <Pizza
            key={pizza.name}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            photoName={pizza.photoName}
            isFavourite={favourites.includes(pizza.name)}
            toggleFavourite={toggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}

// Back button component
function BackButton() {
  return <button className="back-btn">Back to Home</button>;
}

// Order component
function Order() {
  return (
    <div className="order">
      <p>We’re currently open!</p>
      <button className="order-btn">Order Now</button>
    </div>
  );
}

// Footer component
function Footer() {
  return <footer className="footer">{isOpen ? <Order /> : <p>Sorry, we’re closed.</p>}</footer>;
}

// App component
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <BackButton />
      <Footer />
    </div>
  );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
