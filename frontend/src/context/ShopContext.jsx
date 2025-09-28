import React, { createContext, useState } from "react";
import { products as allProducts } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const currency = "৳";
  const delivery_fee = 10;

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

  return (
    <ShopContext.Provider
      value={{
        products: allProducts,
        cartItems,
        addToCart,
        currency,
        delivery_fee,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
