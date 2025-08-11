import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relProduct, setRelProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0 && category && subCategory) {
      const filtered = products.filter(
        (item) =>
          item.category === category && item.subCategory === subCategory
      );
      setRelProduct(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24' onClick={() => scrollTo(0, 0)}>
      <div className='text-center text-3xl py-2'>
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {relProduct.length > 0 ? (
          relProduct.map((product, i) => (
            <ProductItem key={product._id || i} {...product} />
          ))
        ) : (
          <p className='col-span-full text-center text-gray-500'>
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
