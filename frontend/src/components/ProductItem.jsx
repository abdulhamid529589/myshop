import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ _id, image, name, price, category, subCategory }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating when clicking the button
    addToCart({ _id, image, name, price, category, subCategory });
    navigate("/cart");
  };

  // Helper to format price safely
  const formatPrice = (price) => {
    // If currency is a symbol (like ৳), just prepend it
    if (currency.length > 1 || !/^[A-Z]{3}$/.test(currency)) {
      return `${currency}${price.toLocaleString()}`;
    }
    // If currency is a valid ISO code (like USD, BDT)
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(price);
    } catch {
      // fallback
      return `${currency}${price.toLocaleString()}`;
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${_id}`)}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-2xl">
        <img
          src={image[0]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-purple-600 text-white rounded-xl opacity-0 group-hover:opacity-100 shadow-lg transition-all duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-1">
        <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {name}
        </p>

        <p className="text-sm sm:text-base font-bold text-gray-900">
          {formatPrice(price)}
        </p>

        {/* Category and Subcategory */}
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="text-xs text-gray-500 font-medium">{category}</span>
          <span className="text-xs text-purple-600 font-medium">
            {subCategory}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
