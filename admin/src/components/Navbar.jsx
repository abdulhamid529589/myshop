import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <NavLink to="/">
        <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      </NavLink>
      <button className="bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
