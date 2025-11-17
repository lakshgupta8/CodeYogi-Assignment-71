import { memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";

function CartRow({ item, quantity, onQuantityChange, onRemoveItem }) {
  const subtotal = useMemo(
    function () {
      return item.price * Number(quantity);
    },
    [item.price, quantity]
  );

  const handleChange = useCallback(
    function (event) {
      const val = event.target.value;
      const num = Number(val);
      if (isNaN(num) || num <= 0) {
        onRemoveItem(item.id);
      } else {
        onQuantityChange(item.id, num);
      }
    },
    [onRemoveItem, onQuantityChange, item.id]
  );

  const handleRemove = useCallback(
    function () {
      onRemoveItem(item.id);
    },
    [onRemoveItem, item.id]
  );

  return (
    <div className="px-4 py-3 flex flex-col sm:grid grid-cols-12 gap-4 text-center items-center text-gray-800 font-medium">
      <button
        className="hidden sm:block col-span-1 text-2xl text-gray-400 hover:text-gray-600"
        onClick={handleRemove}
      >
        <TiDeleteOutline />
      </button>

      <div className="col-span-5 w-full">
        <div className="sm:hidden flex justify-center mb-3">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-20 object-contain"
          />
        </div>

        <Link
          to={"/product/" + item.id}
          state={{ from: "cart" }}
          className="hidden sm:flex items-center gap-4 md:gap-6"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-20 object-contain"
          />
          <span className="text-primary-default text-start">{item.title}</span>
        </Link>

        <div className="sm:hidden space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold mr-2">Product</span>
            <span className="text-primary-default text-end">{item.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Price</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Quantity</span>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 w-16 text-center"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="hidden sm:block col-span-2 text-center">
        <div>${item.price.toFixed(2)}</div>
      </div>

      <div className="hidden sm:block col-span-2 text-center">
        <input
          type="number"
          value={quantity}
          className="border border-gray-300 px-2 py-1 w-12 sm:w-16 text-center"
          onChange={handleChange}
        />
      </div>

      <div className="hidden sm:block col-span-2 text-center">
        <div>${subtotal.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default memo(CartRow);
