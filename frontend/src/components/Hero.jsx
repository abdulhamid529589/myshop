import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div
      className="flex flex-col sm:flex-row border border-gray-200 rounded-lg shadow-md bg-white
                    h-[400px] sm:h-[450px] lg:h-[400px]"
    >
      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-6 sm:px-12 py-6 sm:py-8">
        <div className="text-[#414141] max-w-lg">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-4">
            <p className="w-8 md:w-12 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base uppercase tracking-wide">
              Our Best Sellers
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug mb-6">
            Latest Arrivals
          </h1>

          {/* CTA Button */}
          <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold hover:bg-gray-800 transition">
            SHOP NOW
            <span className="w-8 md:w-12 h-[2px] bg-white"></span>
          </button>
        </div>
      </div>

      {/* Right Side (Hero Image) */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-gray-50 p-6">
        <img
          src={assets.mypic}
          alt="Latest Collection"
          className="w-full sm:w-3/4 md:w-2/3 lg:w-3/4 h-auto max-h-full rounded-lg shadow-lg object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
