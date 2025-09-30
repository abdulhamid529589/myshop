import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductItem = ({ _id, image, name, price, category, subCategory }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  // Add to cart without navigating and show toast
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ _id, image, name, price, category, subCategory });
    toast.success(`${name} added to the cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Navigate to product details
  const handleSeeDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${_id}`);
  };

  const formatPrice = (price) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(price);
    } catch {
      return `${currency}${price.toLocaleString()}`;
    }
  };

  return (
    <div
      onClick={handleSeeDetails}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-2xl">
        <img
          src={image[0]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="
            absolute bottom-3 left-1/2 -translate-x-1/2 
            bg-purple-600 text-white rounded-xl shadow-lg 
            text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2
            sm:opacity-0 sm:group-hover:opacity-100 
            transition-opacity duration-300
            w-16 sm:w-auto text-center
          "
        >
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {name}
        </p>

        <p className="text-sm sm:text-base font-bold text-gray-900">
          {formatPrice(price)}
        </p>

        {/* See Details Button */}
        <button
          onClick={handleSeeDetails}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 rounded-xl shadow-sm hover:bg-gray-300 w-full text-center font-medium transition"
        >
          See Details
        </button>

        {/* Category & Subcategory */}
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
