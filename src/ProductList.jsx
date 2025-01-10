// import { useState, useEffect } from "react";
import { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";

import plantsArray from "./assets/products";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false); // Hide the cart when navigating to About Us
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="plant leave"
            />
            <a href="./" style={{ textDecoration: "none" }}>
              <div>
                <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div id="navbar-right-panel" className="right-items">
          <div className="right-item">
            <a
              href="#"
              onClick={(e) => handlePlantsClick(e)}
              className="right-items"
            >
              Plants
            </a>
          </div>
          <div id="cart-container">
            <a
              href="#"
              onClick={(e) => handleCartClick(e)}
              className="right-items"
            >
              <h1 className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>
              </h1>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map(({ category, plants }, index) => (
            <div key={index}>
              <div className="category">
                <h1>{category}</h1>
              </div>
              <div className="product-list">
                {plants.map(
                  ({ name, image, description, cost }, plantIndex) => (
                    <div className="product-card" key={plantIndex}>
                      <div className="product-title">{name}</div>
                      <img className="product-image" src={image} alt={name} />
                      <div className="product-price">{cost}</div>
                      <div className="product-description">{description}</div>
                      <button
                        className="product-button"
                        onClick={() =>
                          handleAddToCart({ name, image, description, cost })
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
