import React, { useState, useEffect, useMemo, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { products as allProducts } from "../assets/frontend_assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const useQuery = () => new URLSearchParams(useLocation().search);

const Collection = () => {
  const { addToCart, currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const query = useQuery();

  // States
  const [searchTerm, setSearchTerm] = useState(query.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState(
    query.get("category") ? [query.get("category")] : []
  );
  const [selectedTypes, setSelectedTypes] = useState(
    query.get("subCategory") ? [query.get("subCategory")] : []
  );
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (category) =>
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );

  const handleTypeChange = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSearchTerm("");
    setSortOption("default");
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let updated = allProducts.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(product.subCategory);
      return matchSearch && matchCategory && matchType;
    });

    if (sortOption === "low-high") updated.sort((a, b) => a.price - b.price);
    else if (sortOption === "high-low")
      updated.sort((a, b) => b.price - a.price);
    else if (sortOption === "newest") updated.sort((a, b) => b.date - a.date);

    return updated;
  }, [searchTerm, selectedCategories, selectedTypes, sortOption]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-6 px-4 sm:px-8 border-t">
      {/* Sidebar / Filters */}
      <aside
        className={`sm:w-64 flex flex-col gap-6 transition-all duration-300 ${
          showFilters ? "block" : "hidden sm:block"
        }`}
      >
        {/* Category Filter */}
        <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-700">CATEGORIES</p>
          {["Men", "Women", "Kids"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="w-4 h-4 accent-purple-600"
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Type Filter */}
        <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-700">TYPE</p>
          {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="w-4 h-4 accent-purple-600"
              />
              {type}
            </label>
          ))}
        </div>

        {/* Clear Filters */}
        <button
          onClick={handleClearFilters}
          className="mt-5 px-4 py-2 bg-white border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition"
        >
          Clear All Filters
        </button>
      </aside>

      {/* Products Grid */}
      <main className="flex-1 flex flex-col gap-6">
        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="default">Sort: Default</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="group border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="absolute bottom-2 right-2 px-3 py-1 text-xs sm:text-sm bg-purple-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-medium text-sm sm:text-base truncate">
                    {product.name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {currency}
                    {product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
              No products found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;
