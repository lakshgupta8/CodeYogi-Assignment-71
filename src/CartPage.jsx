import { useState, useEffect, useMemo } from "react";
import CartDetail from "./components/CartDetail";
import EmptyCart from "./components/EmptyCart";
import Loading from "./components/Loading";
import { getProduct } from "./api";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

function CartPage({ cartItems, onRemoveItem, onQuantityChange }) {
  const location = useLocation();
  const [cartItemsData, setCartItemsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ids = useMemo(function () {
    return Object.keys(cartItems || {});
  }, [cartItems]);

  useEffect(
    function () {
      if (ids.length === 0) {
        setCartItemsData([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      Promise.all(
        ids.map(function (id) {
          return getProduct(id).then(function (product) {
            return { ...product, quantity: cartItems[id] };
          });
        })
      )
        .then(function (products) {
          setCartItemsData(products);
        })
        .catch(function () {
          setCartItemsData([]);
        })
        .finally(function () {
          setLoading(false);
        });
    },
    [ids, cartItems]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:px-8 pb-8">
      <Link to={location?.state?.from || "/"} className="self-end">
        <HiOutlineArrowNarrowLeft className="text-gray-800 text-3xl md:text-4xl" />
      </Link>
      <div className="flex-1 bg-white p-4">
        {cartItemsData.length > 0 && (
          <CartDetail
            cartItems={cartItemsData}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
          />
        )}
        {cartItemsData.length == 0 && <EmptyCart />}
      </div>
    </div>
  );
}

export default CartPage;
