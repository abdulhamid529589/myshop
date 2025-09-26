import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between py-5 px-4 sm:px-8 font-medium shadow-md relative bg-white">
      {/* Logo */}
      <img src={assets.logo} className="w-28 sm:w-36" alt="Logo" />

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
        <NavLink
          to="/"
          className="hover:text-black transition flex flex-col items-center gap-1"
        >
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block" />
        </NavLink>
        <NavLink
          to="/collection"
          className="hover:text-black transition flex flex-col items-center gap-1"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block" />
        </NavLink>
        <NavLink
          to="/about"
          className="hover:text-black transition flex flex-col items-center gap-1"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block" />
        </NavLink>
        <NavLink
          to="/contact"
          className="hover:text-black transition flex flex-col items-center gap-1"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block" />
        </NavLink>
      </ul>

      {/* Icons + Mobile Menu Button */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile dropdown */}
        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg shadow-md">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img className="w-5 min-w-5" src={assets.cart_icon} alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            10
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="sm:hidden block focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <img src={assets.logo} className="w-24" alt="Logo" />
          <button onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 p-6 text-gray-700 text-lg font-medium">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-black transition"
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            onClick={() => setMenuOpen(false)}
            className="hover:text-black transition"
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-black transition"
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-black transition"
          >
            CONTACT
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
