import { memo } from "react";

function CartTotals({ subtotal }) {
  return (
    <div className="text-gray-800 border border-gray-300 md:w-2/5 md:ml-auto">
      <div className="bg-gray-50 px-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Cart totals</h2>
      </div>
      <div className="px-4 divide-y divide-gray-300 mt-2">
        <div className="flex py-2">
          <span className="w-1/2">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex py-2">
          <span className="w-1/2">Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="py-4">
          <button className="w-full bg-primary-default hover:bg-primary-medium text-white font-semibold py-3 px-4 rounded">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CartTotals);
