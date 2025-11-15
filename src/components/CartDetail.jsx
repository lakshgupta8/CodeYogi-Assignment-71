import { useState, useEffect, useMemo, useCallback } from "react";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

function CartDetail({ cartItems, onQuantityChange, onRemoveItem }) {
  const [subtotal, setSubtotal] = useState(function () {
    const saved = localStorage.getItem("cartSubtotal");
    return saved ? Number(saved) : 0;
  });

  useEffect(
    function () {
      localStorage.setItem("cartSubtotal", String(subtotal));
    },
    [subtotal]
  );

  const calculatedSubtotal = useMemo(
    function () {
      let sum = 0;
      cartItems.forEach(function (item) {
        const q = item.quantity ?? 1;
        sum += item.price * Number(q);
      });
      return sum;
    },
    [cartItems]
  );

  const handleUpdateCart = useCallback(
    function () {
      setSubtotal(calculatedSubtotal);
    },
    [calculatedSubtotal]
  );

  return (
    <div className="flex flex-col">
      <div className="border border-gray-300 divide-y divide-gray-300">
        <div className="bg-gray-50 py-2 hidden sm:grid grid-cols-12 text-lg text-center text-black font-semibold">
          <div className="m-auto col-span-6">
            <h2>Product</h2>
          </div>
          <h2 className="col-span-2">Price</h2>
          <h2 className="col-span-2">Quantity</h2>
          <h2 className="col-span-2">Subtotal</h2>
        </div>
        <CartList
          items={cartItems}
          onQuantityChange={onQuantityChange}
          onRemoveItem={onRemoveItem}
        />
        <div className="flex flex-col md:flex-row justify-between py-2 px-4 gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Coupon code"
              className="border border-gray-300 text-black px-4 py-2 text-sm w-full md:w-auto"
            />
            <button className="bg-primary-dark hover:bg-primary-extradark text-white px-6 py-2 rounded font-medium text-sm w-full md:w-auto">
              APPLY COUPON
            </button>
          </div>
          <button
            onClick={handleUpdateCart}
            className="bg-primary-light hover:bg-primary-default text-white px-6 py-2 rounded font-medium text-sm w-full md:w-auto"
          >
            UPDATE CART
          </button>
        </div>
      </div>
      <div className="self-end w-full mt-2 md:mt-6">
        <CartTotals subtotal={subtotal} />
      </div>
    </div>
  );
}

export default CartDetail;