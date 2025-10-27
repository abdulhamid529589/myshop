import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="relative py-16 px-6 sm:px-12 lg:px-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            About Our Shop 🛍️
          </h1>
          <p className="text-base sm:text-lg opacity-90 leading-relaxed max-w-2xl mx-auto">
            We bring you the best quality products with love, care, and passion.
            Our mission is to make shopping easier, faster, and more reliable
            for everyone.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              Our Mission 🚀
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At <span className="font-semibold text-purple-600">ShopEase</span>
              , we aim to provide our customers with a smooth shopping
              experience. From selecting products to checkout, everything is
              designed to be fast, secure, and enjoyable.
            </p>
          </div>
          <div className="bg-purple-100 rounded-2xl shadow-md p-6 text-purple-900 font-medium">
            <ul className="space-y-3">
              <li>✅ High-quality products</li>
              <li>✅ Secure payment process</li>
              <li>✅ Fast & reliable delivery</li>
              <li>✅ Dedicated customer support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-purple-600">10K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-600">5K+</h3>
            <p className="text-gray-600">Products</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-600">99%</h3>
            <p className="text-gray-600">Satisfaction</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-600">24/7</h3>
            <p className="text-gray-600">Support</p>
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            Meet Our Team 👨‍💻👩‍💻
          </h2>
          <p className="text-gray-600 mb-10">
            We’re a passionate group of people committed to making online
            shopping better every day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl">
                A
              </div>
              <h3 className="mt-4 text-lg font-semibold">Alice Johnson</h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto rounded-full bg-pink-200 flex items-center justify-center text-pink-700 font-bold text-xl">
                M
              </div>
              <h3 className="mt-4 text-lg font-semibold">Michael Lee</h3>
              <p className="text-sm text-gray-500">Head of Operations</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xl">
                S
              </div>
              <h3 className="mt-4 text-lg font-semibold">Sophia Wang</h3>
              <p className="text-sm text-gray-500">Lead Designer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
