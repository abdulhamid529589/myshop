import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    addToCart,
    currency,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const total = subtotal + delivery_fee;

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

  const increaseQuantity = (item) => {
    addToCart(item);
    toast.success(`${item.name} quantity increased`);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      removeFromCart(item._id);
      addToCart({ ...item, quantity: item.quantity - 1 });
      toast.success(`${item.name} quantity decreased`);
    } else {
      removeFromCart(item._id);
      toast.success(`${item.name} removed from cart`);
    }
  };

  const handleQuantityChange = (item, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    addToCart({ ...item, quantity: qty });
    toast.success(`${item.name} quantity updated`);
  };

  const handleRemoveAll = () => {
    clearCart();
    toast.success("All items removed from cart");
  };

  const recommended = products
    .filter((p) => !cartItems.find((ci) => ci._id === p._id))
    .slice(0, 4);

  return (
    <div className="p-4 sm:p-8 min-h-[70vh] max-w-6xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Cart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Your Cart
        </h1>
        {cartItems.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Remove All
          </button>
        )}
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <>
          <p className="text-gray-500 text-lg text-center py-20">
            Your cart is empty.
          </p>

          {recommended.length > 0 && (
            <div>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                Recommended for you
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                {recommended.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer flex flex-col items-center"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-32 sm:h-40 md:h-48 lg:h-52 object-cover rounded-xl mb-2"
                    />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium w-full truncate text-center">
                      {item.name}
                    </p>
                    <p className="text-purple-600 font-bold mt-1">
                      {currency}
                      {item.price}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        toast.success(`${item.name} added to cart`);
                      }}
                      className="w-full mt-2 bg-purple-600 text-white py-1 rounded-lg text-sm sm:text-base hover:bg-purple-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex-wrap sm:flex-nowrap"
              >
                <div
                  className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto cursor-pointer"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl truncate">
                      {item.name}
                    </p>
                    <p className="text-purple-600 font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                      {currency}
                      {(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-lg font-semibold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                    className="w-16 text-center border rounded-lg px-2 py-1"
                  />
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-lg font-semibold"
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
                  className="text-red-600 font-semibold hover:text-red-800 transition mt-4 sm:mt-0 px-4 py-2 border border-red-600 rounded-lg hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <p className="text-gray-600 text-base sm:text-lg">
                Subtotal: {currency}
                {subtotal.toLocaleString()}
              </p>
              <p className="text-gray-600 text-base sm:text-lg">
                Delivery Fee: {currency}
                {delivery_fee.toLocaleString()}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                Total: {currency}
                {total.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
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
