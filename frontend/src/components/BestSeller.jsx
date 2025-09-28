import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const best = products.filter((item) => item.bestseller);
    setBestSellers(best.slice(0, 5)); // top 5 bestsellers
  }, [products]);

  if (bestSellers.length === 0) return null;

  return (
    <section className="my-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      {/* Title Section */}
      <div className="text-center py-6">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          Where style meets customer favorites
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {bestSellers.map((item) => (
          <ProductItem
            key={item._id}
            _id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
