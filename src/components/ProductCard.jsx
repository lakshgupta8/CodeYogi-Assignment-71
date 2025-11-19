import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function ProductCard({
  id,
  title,
  category,
  price,
  discountPercentage,
  thumbnail,
  rating,
}) {
  const originalPrice = useMemo(
    function () {
      if (discountPercentage === 0 || discountPercentage == null) return null;
      return (price * 100) / (100 - discountPercentage);
    },
    [price, discountPercentage]
  );

  return (
    <Link to={"/product/" + id} state={{ from: "home" }}>
      <div className="bg-white flex flex-col">
        <div className="mb-3 bg-gray-100">
          <img src={thumbnail} alt={title} className="w-full object-contain" />
        </div>

        <p className="text-sm text-gray-400 mt-1">{category}</p>
        <h3 className="font-semibold text-gray-800 mt-1">{title}</h3>
        <StarRating rating={rating} />
        <div className="flex gap-2 mt-2 mb-2">
          {originalPrice && (
            <span className="text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-primary-dark font-bold">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
