import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="flex flex-col-reverse sm:flex-row items-center border border-gray-200 rounded-2xl shadow-md bg-white
                 h-auto sm:h-[450px] lg:h-[420px] overflow-hidden mt-3 transition-all duration-300"
    >
      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-6 sm:py-10 text-center sm:text-left">
        {/* Tagline */}
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
          <span className="w-8 md:w-12 h-[2px] bg-black/70"></span>
          <p className="font-medium text-sm md:text-base uppercase tracking-wide text-gray-600">
            Our Best Sellers
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug mb-6 text-gray-900">
          Latest Arrivals
        </h1>

        {/* CTA Button */}
        <Link to="/collection">
          <button className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold hover:bg-gray-800 active:scale-95 transition mx-auto sm:mx-0">
            SHOP NOW
            <span className="w-5 md:w-8 h-[2px] bg-white"></span>
          </button>
        </Link>
      </div>

      {/* Right Side (Hero Image redesigned & optimized) */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-gray-50 p-6 sm:p-8 lg:p-10">
        <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-3/4">
          {/* Image with rounded corners, shadow & smooth fit */}
          <img
            src={assets.mypic}
            alt="Latest Collection"
            className="rounded-2xl shadow-xl object-cover w-full h-full max-h-[380px] transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />

          {/* Decorative Glow/Overlay for modern look */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
