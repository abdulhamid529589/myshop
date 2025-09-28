import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation, useNavigate } from "react-router-dom";

const Collection = () => {
  const { products, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const subCategory = params.get("subCategory");

    if (category) setSelectedCategories([category]);
    if (subCategory) setSelectedTypes([subCategory]);
  }, [location.search]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    let updatedProducts = products.filter((p) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(p.subCategory);
      return matchSearch && matchCategory && matchType;
    });

    if (sortOption === "low-high")
      updatedProducts.sort((a, b) => a.price - b.price);
    else if (sortOption === "high-low")
      updatedProducts.sort((a, b) => b.price - a.price);
    else if (sortOption === "newest")
      updatedProducts.sort((a, b) => b.date - a.date);

    setFilteredProducts(updatedProducts);
  }, [
    debouncedSearch,
    selectedCategories,
    selectedTypes,
    sortOption,
    products,
  ]);

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
    navigate("/cart"); // ✅ redirect to cart page
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-6 px-4 sm:px-8 border-t">
      {/* Sidebar */}
      <div className="sm:w-64 flex flex-col gap-6">
        <div className="bg-gray-50 rounded-xl border p-4">
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

        <div className="bg-gray-50 rounded-xl border p-4">
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

        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedTypes([]);
            setSearchTerm("");
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Products Grid */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
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
                      handleAddToCart(product); // ✅ navigate after adding
                    }}
                    className="absolute bottom-2 right-2 px-3 py-1 text-xs sm:text-sm bg-purple-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-medium text-sm sm:text-base truncate">
                    {product.name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {product.price}৳
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
      </div>
    </div>
  );
};

export default Collection;
