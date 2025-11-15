import { memo } from "react";
import { Link } from "react-router-dom";
import notfoundimage from "/images/404notfound.jpg";

function NotFound() {
  return (
    <div className="flex flex-col my-16 bg-white items-center py-6 max-w-md md:max-w-3xl text-center gap-4 mx-auto">
      <img src={notfoundimage} alt="404 Not Found" className="w-40 h-40" />
      <h2 className="text-4xl font-semibold text-primary-dark">
        Page Not Found
      </h2>
      <div className="text-gray-500 text-sm">
        <p>We're sorry, the page you requested could not be found</p>
        <p>Please go back to the homepage</p>
      </div>

      <Link
        to="/"
        className="bg-primary-default hover:bg-primary-medium text-white px-5 py-2 mt-6 rounded-3xl font-medium"
      >
        GO HOME
      </Link>
    </div>
  );
}

export default memo(NotFound);
