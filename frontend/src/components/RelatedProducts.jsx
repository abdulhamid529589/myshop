import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ currentProduct }) => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const relatedProducts = products.filter(
    (p) =>
      p.category === currentProduct.category && p._id !== currentProduct._id
  );

  if (!relatedProducts.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl overflow-hidden bg-white hover:shadow-xl transition flex flex-col"
          >
            <div
              className="w-full h-48 sm:h-56 bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-3 flex flex-col gap-1 flex-1">
              <h3 className="text-sm sm:text-base font-medium text-gray-700 truncate">
                {product.name}
              </h3>
              <p className="text-purple-700 font-bold text-base sm:text-lg">
                {currency}
                {product.price}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 bg-purple-600 text-white py-1 rounded-lg text-sm hover:bg-purple-700 transition"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 border border-gray-300 text-gray-700 py-1 rounded-lg text-sm hover:bg-gray-100 transition"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
