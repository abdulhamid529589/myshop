import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email!");
      return;
    }
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <div className="bg-purple-50 py-12 px-4 sm:px-6 lg:px-20 rounded-xl text-center max-w-2xl mx-auto shadow-lg">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-700">
        Join & Get 20% Off
      </h2>

      {/* Subtitle */}
      <p className="text-purple-500 mt-2 text-sm sm:text-base">
        Stay updated with our latest products, offers, and news
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="mt-6 flex flex-col sm:flex-row items-center gap-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-600 focus:outline-none text-gray-800 transition placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          SUBSCRIBE
        </button>
      </form>

      {/* Optional note */}
      <p className="text-gray-500 text-xs sm:text-sm mt-4">
        We respect your privacy. No spam, unsubscribe anytime.
      </p>
    </div>
  );
};

export default NewsLetterBox;
