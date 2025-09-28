import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const RelatedProducts = ({ currentProduct }) => {
  const { products, currency } = useContext(ShopContext);

  // Filter products by the same category but exclude the current product
  const relatedProducts = products.filter(
    (p) =>
      p.category === currentProduct.category && p._id !== currentProduct._id
  );

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-12">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Related Products
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="border rounded-xl overflow-hidden bg-white hover:shadow-xl transition duration-300 flex flex-col"
          >
            {/* Product Image */}
            <div className="w-full h-48 sm:h-56 bg-gray-100">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-3 flex flex-col gap-1 flex-1">
              <h3 className="text-sm sm:text-base font-medium text-gray-700 truncate">
                {product.name}
              </h3>
              <p className="text-purple-700 font-bold text-base sm:text-lg">
                {currency}
                {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
