import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Cart = () => {
  const {
    cartItems = [],
    removeFromCart,
    clearCart,
    addToCart,
    updateCartItemQuantity,
    currency,
    delivery_fee = 0,
    products = [],
    subtotal,
    total,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  // Recommended products excluding items in cart
  const recommended = products
    .filter((p) => !cartItems.find((ci) => ci._id === p._id))
    .slice(0, 4);

  // Checkout handler
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate("/place-order", {
      state: { cartItems, subtotal, delivery_fee, total },
    });
    toast.success("Proceeding to checkout...");
  };

  // Remove all items
  const handleRemoveAll = () => {
    clearCart();
    toast.success("All items removed from cart");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-[70vh] max-w-6xl mx-auto">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Your Cart
        </h1>
        {cartItems.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
          >
            Remove All
          </button>
        )}
      </div>

      {/* Empty State */}
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-lg py-16 sm:py-24">
            Your cart is empty.
          </p>

          {/* Recommended */}
          {recommended.length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Recommended for you
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                {recommended.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 sm:p-4 cursor-pointer flex flex-col items-center"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-28 sm:h-36 md:h-44 object-cover rounded-lg mb-2"
                    />
                    <p className="text-sm sm:text-base font-medium text-center line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-purple-600 font-bold mt-1 text-sm sm:text-base">
                      {currency}
                      {item.price}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        toast.success(`${item.name} added to cart`);
                      }}
                      className="w-full mt-2 bg-purple-600 text-white py-1.5 rounded-lg text-xs sm:text-sm hover:bg-purple-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {/* Item Info */}
                <div
                  className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto cursor-pointer"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg truncate">
                      {item.name}
                    </p>
                    <p className="text-purple-600 font-bold text-sm sm:text-base">
                      {currency}
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item._id, item.quantity - 1)
                    }
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="w-12 sm:w-16 text-center border rounded-lg px-2 py-1"
                    readOnly
                  />
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item._id, item.quantity + 1)
                    }
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => {
                    removeFromCart(item._id);
                    toast.success(`${item.name} removed from cart`);
                  }}
                  className="text-red-600 font-semibold hover:text-red-800 transition mt-4 sm:mt-0 px-3 py-1.5 border border-red-600 rounded-lg hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="flex flex-col gap-2 w-full sm:w-auto text-base">
              <p className="text-gray-600">
                Subtotal: {currency}
                {subtotal.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Delivery Fee: {currency}
                {delivery_fee.toLocaleString()}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                Total: {currency}
                {total.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full sm:w-auto bg-purple-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-base"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
