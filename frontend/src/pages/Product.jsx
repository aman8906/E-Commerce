import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/products";
import RelatedProducts from "../components/RelatedProducts"; // ✅ Corrected name

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image?.[0] || "");
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size.");
      return;
    }
    addToCart(productData._id, size);
    navigate("/cart");
  };

  if (!productData) return <div className='opacity-0'></div>;

  return (
    <main className='border-t-2 transition-opacity ease-in duration-500 opacity-100'>
      {/* --------product data---------- */}
      <div className='flex gap-12 flex-col sm:flex-row mt-10'>
        {/* -------product images---------- */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[18.7%] w-full'>
            {(productData.image || []).map((img, i) => (
              <img
                key={i}
                onClick={() => setImage(img)}
                src={img}
                alt='thumbnail'
                className='w-[24%] sm:w-full mb-3 flex-shrink-0 cursor-pointer'
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='main product' />
          </div>
        </div>

        {/* -----product informations------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt='star' className='w-3.5' />
            ))}
            <img src={assets.star_dull_icon} alt='star' className='w-3.5' />
            <p className='pl-2'>(132)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>
            {currency} {productData.price}
          </p>
          <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {(productData.sizes || []).map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`border py-2 px-4 bg-slate-100 ${
                    s === size ? "border-orange-500" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ------description & review secion-------- */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews (132)</p>
        </div>
        <div className='flex flex-col gap-4 border p-6 text-sm text-gray-500'>
          <p>{productData.description}</p>
          <p>
            The Nile Men's Round Neck T-shirt is crafted from 100% pure cotton,
            offering a soft, breathable texture that feels great on the skin.
            Ideal for casual wear, this T-shirt strikes the perfect balance
            between comfort and style.
          </p>
        </div>
      </div>

      {/* ------display related products -------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </main>
  );
};

export default Product;
