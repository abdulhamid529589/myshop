import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => b.date - a.date);
    setLatestProducts(sorted.slice(0, 12)); // latest 12 products
  }, [products]);

  return (
    <div className="my-14 px-4 sm:px-10">
      <div className="text-center py-6">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="mt-2 text-gray-500 max-w-xl mx-auto text-sm">
          Style starts here—discover what’s new
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            _id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
