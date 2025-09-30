import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const { cartItems, subtotal, delivery_fee, total, addOrder } =
    useContext(ShopContext);
  const navigate = useNavigate();

  // Steps: shipping → payment → confirm
  const [step, setStep] = useState(1);

  // Shipping info
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!customer.name || !customer.phone || !customer.address) {
        setError("⚠️ Please fill in all shipping details.");
        return;
      }
      setError("");
      setStep(2);
    } else if (step === 2) {
      if (paymentMethod !== "cod" && !transactionId) {
        setError("⚠️ Please enter transaction ID for online payment.");
        return;
      }
      setError("");
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      subtotal,
      delivery_fee,
      total,
      date: new Date().toLocaleString(),
      customer,
      paymentMethod,
      transactionId: paymentMethod === "cod" ? null : transactionId,
      status: "Confirmed",
    };

    addOrder(newOrder);
    navigate("/orders");
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto min-h-[70vh]">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT PANEL */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          {/* Step Indicators */}
          <div className="flex justify-between items-center mb-6 text-sm font-medium">
            <span className={step >= 1 ? "text-purple-600" : "text-gray-400"}>
              1. Shipping
            </span>
            <span className={step >= 2 ? "text-purple-600" : "text-gray-400"}>
              2. Payment
            </span>
            <span className={step === 3 ? "text-purple-600" : "text-gray-400"}>
              3. Confirm
            </span>
          </div>

          {/* Step 1 - Shipping */}
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Shipping Details
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={customer.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </>
          )}

          {/* Step 2 - Payment */}
          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: "cod", label: "Cash on Delivery" },
                  { value: "bkash", label: "bKash" },
                  { value: "nagad", label: "Nagad" },
                  { value: "card", label: "Credit / Debit Card" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`cursor-pointer border p-4 rounded-xl text-sm font-medium shadow-sm transition hover:shadow-md ${
                      paymentMethod === method.value
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    {method.label}
                  </label>
                ))}
              </div>

              {/* Transaction ID for online payments */}
              {paymentMethod !== "cod" && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              )}
            </>
          )}

          {/* Step 3 - Confirm */}
          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Review & Confirm
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Name:</strong> {customer.name}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Phone:</strong> {customer.phone}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Address:</strong> {customer.address}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Payment:</strong>{" "}
                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : `${paymentMethod.toUpperCase()} (${transactionId})`}
              </p>
            </>
          )}

          {/* Error */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          {/* Step Buttons */}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Confirm Order
              </button>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-2 text-sm"
              >
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  ৳{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-gray-600">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span>৳{delivery_fee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-3">
            <span>Total</span>
            <span>৳{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
