import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tl from-purple-900 via-purple-800 to-purple-700 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
        {/* Brand & Description */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-20 sm:w-28 transform transition-transform duration-300 hover:scale-105"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              YourShop
            </h2>
          </div>
          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
            Elevate your style with modern essentials. Seamless shopping, secure
            payments, premium support.
          </p>
          <div className="flex gap-2 sm:gap-3">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
              (Icon, idx) => {
                const colors = [
                  "bg-blue-600",
                  "bg-pink-500",
                  "bg-blue-400",
                  "bg-blue-700",
                ];
                return (
                  <a
                    key={idx}
                    href="#"
                    className={`${colors[idx]} w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transform transition-transform duration-300 hover:scale-110`}
                  >
                    <Icon className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                );
              }
            )}
          </div>
        </div>

        {/* Shop Links */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-white font-bold text-sm sm:text-lg border-b border-purple-600 pb-1 sm:pb-2">
            Shop
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {["Men", "Women", "Kids", "New Arrivals", "Collections"].map(
              (item, idx) => (
                <li
                  key={item}
                  className="transform transition-transform duration-200 hover:translate-x-1 hover:text-yellow-400 cursor-pointer"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-white font-bold text-sm sm:text-lg border-b border-purple-600 pb-1 sm:pb-2">
            Customer Care
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {["FAQ", "Shipping", "Returns", "Contact Us"].map((item, idx) => (
              <li
                key={item}
                className="transform transition-transform duration-200 hover:translate-x-1 hover:text-yellow-400 cursor-pointer"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Promotions & Payment */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-white font-bold text-sm sm:text-lg border-b border-purple-600 pb-1 sm:pb-2">
            Promotions & Payment
          </h3>
          <div className="space-y-1 sm:space-y-2">
            {["🔥 Free Shipping over ৳500", "✨ Exclusive Weekly Deals"].map(
              (promo, idx) => (
                <div
                  key={idx}
                  className="bg-purple-800 p-2 sm:p-3 rounded-md hover:bg-purple-700 transform transition-all duration-300 hover:scale-105"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-100 text-xs sm:text-sm">{promo}</p>
                </div>
              )
            )}
          </div>

          <div className="flex gap-2 sm:gap-3 items-center mt-1 sm:mt-2">
            {["VISA", "MC", "PayPal", "AMX"].map((item, idx) => (
              <div
                key={idx}
                className="w-10 h-6 sm:w-14 sm:h-8 bg-purple-900 rounded-md flex items-center justify-center text-[9px] sm:text-xs font-bold text-white hover:bg-purple-800 transform transition-transform duration-300 hover:scale-105"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="text-gray-300 text-[9px] sm:text-xs mt-2">
            Secure Payment • 24/7 Support • Money-back Guarantee
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800 pt-4 pb-4 sm:pt-6 sm:pb-6 text-center text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} Mohammad Abdul Hamid. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
