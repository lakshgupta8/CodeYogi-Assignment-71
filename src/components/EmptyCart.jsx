import { memo } from "react";
import { Link } from "react-router-dom";
import emptycartimage from "/images/emptycart.svg";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-32">
      <img
        src={emptycartimage}
        alt="No Products"
        className="w-40 h-40 opacity-80"
      />
      <h2 className="text-2xl font-semibold text-gray-700">No Results Found</h2>
      <p className="text-gray-500 mb-4">
        Try adding a product to the cart from the product listing or product
        details page.
      </p>

      <Link
        to="/"
        className="bg-primary-default hover:bg-primary-medium text-white px-5 py-2 mt-6 rounded-3xl font-medium"
      >
        EXPLORE PRODUCTS
      </Link>
    </div>
  );
}

export default memo(EmptyCart);
