import { memo } from "react";
import { Link } from "react-router-dom";

function Pagination() {
  return (
    <div className="flex mt-8 gap-1">
      <Link className="bg-white text-center text-primary-dark border-primary-dark border h-8 w-8 focus:text-white focus:bg-primary-dark hover:bg-primary-dark hover:text-white">
        1
      </Link>
      <Link className="bg-white text-center text-primary-dark border-primary-dark border h-8 w-8 focus:text-white focus:bg-primary-dark hover:bg-primary-dark hover:text-white">
        2
      </Link>
      <Link className="bg-white text-center text-primary-dark border-primary-dark border h-8 w-8 focus:text-white focus:bg-primary-dark hover:bg-primary-dark hover:text-white">
        {"\u2192"}
      </Link>
    </div>
  );
}

export default memo(Pagination);
