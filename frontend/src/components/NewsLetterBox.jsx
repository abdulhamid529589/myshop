import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault(); // prevent page reload
    if (!email) {
      alert("Please enter a valid email!");
      return;
    }
    console.log("Subscribed email:", email);

    // Example: you could send `email` to your backend or an API here
    setEmail(""); // reset input after submit
  };

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-20 rounded-lg text-center max-w-2xl mx-auto shadow-md">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
        Subscribe now & get 20% off
      </h2>

      {/* Optional subtitle */}
      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Stay updated with our latest news and offers
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
          className="w-full sm:flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
