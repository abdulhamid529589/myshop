import React, { createContext, useState, useEffect } from "react";
import { products as allProducts } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  const currency = "৳";
  const delivery_fee = 150;

  // Save orders in localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Add to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Place order
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      date: new Date().toLocaleString(),
      paymentStatus: order.paymentStatus || "unpaid",
      deliveryStatus: "processing",
    };
    setOrders((prev) => [...prev, newOrder]);
    clearCart();
  };

  // Totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + (cartItems.length > 0 ? delivery_fee : 0);

  return (
    <ShopContext.Provider
      value={{
        products: allProducts,
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        clearCart,
        addOrder,
        currency,
        delivery_fee,
        subtotal,
        total,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
