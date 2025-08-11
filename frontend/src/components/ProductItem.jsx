import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ _id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const fallbackImage = "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <Link
      to={`/product/${_id}`}
      onClick={() => scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer"
    >
      <div className="overflow-hidden aspect-[3/4] bg-gray-100 rounded">
        <img
          src={
            Array.isArray(image) && image.length > 0
              ? image[0]
              : fallbackImage
          }
          alt={name || "Product"}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      </div>
      <p className="pt-3 pb-1 text-sm truncate">{name || "Unnamed Product"}</p>
      <p className="text-sm font-medium">
        {currency} {price ?? "N/A"}
      </p>
    </Link>
  );
};

export default ProductItem;
