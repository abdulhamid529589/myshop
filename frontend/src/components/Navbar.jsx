import React, { useState, useContext, useRef, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { products } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const cartItemCount = 10; // Example; replace with dynamic count

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const profileItems = ["My Profile", "Orders", "Logout"];

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -------- Search Handling --------
  const handleSearchChange = (e) => {
    const value = e.target?.value || "";
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSelect = (product) => {
    navigate(
      `/collection?category=${encodeURIComponent(
        product.category
      )}&subCategory=${encodeURIComponent(product.subCategory)}`
    );
    setSearchTerm("");
    setSuggestions([]);
    setMenuOpen(false);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && suggestions[0]) {
      handleSearchSelect(suggestions[0]);
    }
  };

  // -------- Render Helpers --------
  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => isMobile && setMenuOpen(false)}
        className={`${
          isMobile
            ? "hover:bg-purple-50 px-3 py-2 rounded-lg transition-all duration-300"
            : "relative flex flex-col items-center gap-1 transition-all duration-300 group hover:text-purple-600"
        }`}
      >
        {item.name}
      </NavLink>
    ));

  const renderProfile = () => (
    <div className="relative" ref={profileRef}>
      <button
        className="w-6 h-6 sm:w-5 sm:h-5 cursor-pointer hover:scale-110 transition-transform duration-300 focus:outline-none"
        onClick={() => setProfileOpen((prev) => !prev)}
      >
        <img
          src={assets.profile_icon}
          alt="Profile"
          className="w-full h-full rounded-full m-1"
        />
      </button>

      {profileOpen && (
        <ul className="absolute right-0 mt-2 w-40 py-2 bg-white rounded-xl shadow-lg border z-50">
          {profileItems.map((item) => (
            <li
              key={item}
              className="px-4 py-2 text-gray-700 text-sm hover:text-purple-600 hover:bg-purple-50 cursor-pointer transition-all duration-300"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderCart = () => (
    <Link to="/cart" className="relative group">
      <img
        className="w-6 sm:w-5 hover:scale-110 transition-transform duration-300"
        src={assets.cart_icon}
        alt="Cart"
      />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[8px] font-bold text-white bg-purple-600 rounded-full transition-transform duration-300 group-hover:scale-110">
          {cartItemCount}
        </span>
      )}
    </Link>
  );

  const renderSearchBox = (isMobile = false) => (
    <div className={`${isMobile ? "mt-4" : "ml-4"} relative flex items-center`}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleEnterPress}
        className={`px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 pr-8 ${
          isMobile ? "w-full" : "w-48 sm:w-64"
        }`}
      />
      <img
        src={assets.search_icon}
        alt="Search"
        className="w-5 h-5 absolute right-2 cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={() => suggestions[0] && handleSearchSelect(suggestions[0])}
      />

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-50 border max-h-60 overflow-y-auto">
          {suggestions.map((p) => (
            <div
              key={p._id}
              onClick={() => handleSearchSelect(p)}
              className="cursor-pointer px-4 py-2 hover:bg-purple-50 flex items-center gap-2"
            >
              <img
                src={p.image[0]}
                alt={p.name}
                className="w-8 h-8 object-cover rounded"
              />
              <span className="text-gray-700 text-sm">{p.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="flex items-center justify-between py-4 px-4 sm:px-8 bg-white shadow-md font-medium relative">
      {/* Logo */}
      <Link
        to="/"
        className="hover:scale-105 transition-transform duration-300"
      >
        <img src={assets.logo} className="w-24 sm:w-36" alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 lg:gap-8 text-gray-700 items-center text-sm">
        {renderNavLinks()}
        {renderSearchBox()}
      </ul>

      {/* Icons + Mobile Menu */}
      <div className="flex items-center gap-4 sm:gap-6">
        {renderProfile()}
        {renderCart()}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="sm:hidden block focus:outline-none hover:text-purple-600 transition-colors duration-300"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <img
            src={assets.logo}
            className="w-24 hover:scale-105 transition-transform duration-300"
            alt="Logo"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-600 transition-colors duration-300"
          >
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-6 text-gray-700 text-lg font-medium">
          {renderNavLinks(true)}
          {renderSearchBox(true)}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
