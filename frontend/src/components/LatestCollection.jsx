import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products } = useContext(ShopContext);

  // ✅ Sort by date (newest first)
  const latestProducts = [...products]
    .filter((p) => p.date) // Ensure date exists
    .sort((a, b) => b.date - a.date)
    .slice(0, 10); // Get top 10

  return (
    <section className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          ShopEase Clothes offers the latest trendy and high-quality fashion
          collections, keeping you stylish for every occasion.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.length > 0 ? (
          latestProducts.map((item, index) => (
            <ProductItem key={item._id || index} {...item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No latest products found.
          </p>
        )}
      </div>
    </section>
  );
};

export default LatestCollections;
