import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { orders, currency } = useContext(ShopContext);

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-xl font-semibold">No orders yet</h2>
        <p className="mt-2">Your confirmed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-xl p-4 shadow bg-white">
            <div className="flex flex-col sm:flex-row justify-between mb-4 text-sm text-gray-600">
              <span>Order ID: {order.id}</span>
              <span>{order.date}</span>
            </div>

            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-gray-800 mb-2 text-sm sm:text-base"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  {currency}
                  {item.price * item.quantity}
                </span>
              </div>
            ))}

            <div className="flex justify-between font-bold mt-4">
              <span>Total:</span>
              <span>
                {currency}
                {order.total}
              </span>
            </div>

            <div className="mt-3 text-sm">
              <p>
                Payment:{" "}
                <span className="font-medium">{order.paymentStatus}</span>
              </p>
              <p>
                Status:{" "}
                <span className="font-medium">{order.deliveryStatus}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
