import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";

function LoadingProduct() {
  const location = useLocation();
  return (
      <div className="flex flex-col md:px-8 pb-8">
        <Link
          to={location?.state?.from === "cart" ? "/cart" : "/"}
          className="self-end"
        >
          <HiOutlineArrowNarrowLeft className="text-gray-800 text-3xl md:text-4xl" />
        </Link>

        <div className="bg-white flex flex-col md:flex-row py-6 px-4 md:px-8 gap-3">
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 h-96">
            <div className="w-full h-full bg-gray-200 rounded-md animate-pulse" />
          </div>

          <div className="w-full md:w-1/2 px-2 md:px-8 overflow-auto flex flex-col">
            <div className="flex-1">
              <div className="h-8 md:h-12 w-3/4 bg-gray-200 rounded animate-pulse mb-6 md:mb-10" />
              <div className="h-6 md:h-8 w-1/4 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse mb-6" />
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse mb-6" />
            </div>

            <div className="flex justify-between mt-6 md:mt-10">
              <div className="flex flex-col items-center gap-1">
                <div className="h-8 md:h-10 w-8 md:w-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 md:h-5 w-16 md:w-20 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="h-8 md:h-10 w-8 md:w-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 md:h-5 w-16 md:w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoadingProduct;
