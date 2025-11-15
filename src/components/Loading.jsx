import { memo } from "react";
import { ImSpinner9 } from "react-icons/im";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12 mb-22">
      <ImSpinner9 className="animate-spin opacity-75 text-3xl text-primary-medium" />
      <p className="mt-3 text-sm text-gray-600">Loading products…</p>
    </div>
  );
}

export default memo(Loading);
