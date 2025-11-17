import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";
import NotFound from "../components/NotFound";
import LoadingProduct from "../components/LoadingProduct";
import { getProduct } from "../api";

function ProductDetailPage({ onAddToCart }) {
  const id = +useParams().id;
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(
    function () {
      setCount(1);
      getProduct(id)
        .then(function (product) {
          setProduct(product);
          setLoading(false);
        })
        .catch(function () {
          setError(true);
          setLoading(false);
        });
    },
    [id]
  );

  let title, image, price, description, category;
  if (product) {
    title = product.title;
    const images = product.images || [];
    image = images[0];
    price = product.price;
    description = product.description;
    category = product.category;
  }

  const handleCountChange = useCallback(
    function (event) {
      setCount(Number(event.target.value));
    },
    [setCount]
  );

  const handleAddToCart = useCallback(
    function (event) {
      const button = event.currentTarget;
      button.textContent = "ADDING...";
      button.disabled = true;

      setTimeout(function () {
        button.textContent = "ADD TO CART";
        button.disabled = false;
      }, 300);

      onAddToCart(id, count);
      setCount(1);
    },
    [onAddToCart, id, count]
  );

  const handleProductSwitch = useCallback(
    function () {
      setLoading(true);
    },
    [setLoading]
  );

  return (
    <>
      {loading && <LoadingProduct />}
      {error && <NotFound />}
      {!loading && !error && (
        <div className="flex flex-col md:px-8 pb-8">
          <Link
            to={location?.state?.from === "cart" ? "/cart" : "/"}
            className="self-end"
          >
            <HiOutlineArrowNarrowLeft className="text-gray-800 text-3xl md:text-4xl" />
          </Link>

          <div className="bg-white flex flex-col md:flex-row py-6 px-4 md:px-8 gap-3">
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 h-full">
              <img
                className="w-full h-full object-contain bg-gray-100"
                src={image}
                alt={title}
              />
            </div>

            <div className="w-full md:w-1/2 px-2 md:px-8 overflow-auto flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-5xl font-semibold text-gray-500 mb-6 md:mb-10">
                  {title}
                </h1>
                <p className="text-xl lg:text-3xl font-bold text-gray-600 mb-4">
                  ${price !== null ? price.toFixed(2) : "-"}
                </p>
                <p className="text-gray-500 mb-6 md:mb-8 font-semibold text-base lg:text-2xl">
                  {description}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="number"
                    value={count}
                    onChange={handleCountChange}
                    min={1}
                    className="text-gray-600 w-24 sm:w-16 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-dark"
                  />
                  <button
                    onClick={handleAddToCart}
                    className="bg-primary-default hover:bg-primary-dark text-white font-medium px-8 sm:px-12 py-2 rounded-md w-full sm:w-auto"
                  >
                    ADD TO CART
                  </button>
                </div>

                <p className="text-base text-gray-500 mt-6">
                  Category:
                  <span className="text-primary-default"> {category}</span>
                </p>
              </div>

              <div className="flex justify-between mt-6 md:mt-10">
                <div>
                  {id > 1 && (
                    <Link
                      to={"/product/" + (id - 1)}
                      className="flex flex-col items-center"
                      onClick={handleProductSwitch}
                    >
                      <HiArrowSmLeft className="text-gray-800 text-3xl md:text-4xl" />
                      <p className="text-gray-800 text-sm md:text-xl">
                        Previous
                      </p>
                    </Link>
                  )}
                </div>

                <div>
                  {id < 194 && (
                    <Link
                      to={"/product/" + (id + 1)}
                      className="flex flex-col items-center"
                      onClick={handleProductSwitch}
                    >
                      <HiArrowSmRight className="text-gray-800 text-3xl md:text-4xl" />
                      <p className="text-gray-800 text-sm md:text-xl">Next</p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
