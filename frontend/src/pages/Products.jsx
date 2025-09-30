import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const { productId } = useParams();
  const { products, addToCart, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  // Fetch product data based on productId from URL
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setActiveImage(foundProduct.image?.[0]);
      setSelectedSize(""); // User must select size, no default
    }
  }, [productId, products]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (productData.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a product size before adding to cart.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    const productWithOptions = { ...productData, selectedSize };
    addToCart(productWithOptions);
    navigate("/cart");
  };

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-lg">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 flex flex-col gap-12">
      {/* Toast Container */}
      <ToastContainer />

      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Column: Product Images */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Main Image */}
          <div className="border rounded-2xl shadow-md overflow-hidden">
            <img
              src={activeImage}
              alt={productData.name}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-cover rounded-xl hover:scale-105 transition duration-500"
            />
          </div>

          {/* Thumbnail Images */}
          {productData.image?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide mt-2">
              {productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                    activeImage === img
                      ? "border-purple-600 scale-105"
                      : "border-gray-200 hover:border-purple-400"
                  }`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Product Name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {productData.name}
          </h1>

          {/* Product Price */}
          <p className="text-2xl sm:text-3xl font-bold text-purple-700">
            {currency}
            {productData.price}
          </p>

          {/* Category / Subcategory */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              {productData.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              {productData.subCategory}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          {/* Sizes */}
          {productData.sizes?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border text-sm font-medium flex items-center justify-center transition ${
                      selectedSize === size
                        ? "bg-purple-600 text-white border-purple-600 scale-105"
                        : "bg-white text-gray-700 border-gray-300 hover:border-purple-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts currentProduct={productData} />
    </div>
  );
};

export default Products;
