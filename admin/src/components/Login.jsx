import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      // Example: API call placeholder
      console.log("Logging in with:", { email, password });

      // You can replace with actual API request
      // const res = await fetch("/api/login", { ... });

      // Reset form
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side (Brand / Illustration) */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Manage your admin panel with ease. Secure login for administrators
          only.
        </p>
      </div>

      {/* Right Side (Login Form) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Admin Panel Login
          </h1>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-2">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={onSubmitHandler}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Extra Links */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Forgot your password?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Reset here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
