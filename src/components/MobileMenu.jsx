import { Link } from "react-router-dom";
import { HiOutlineShoppingBag, HiX } from "react-icons/hi";
import { memo } from "react";

function MobileMenu({ isOpen, onClose, navLinks, count, location }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 sm:hidden" onClick={onClose}>
      <div
        className="absolute top-0 right-0 h-full w-64 bg-gray-100 shadow-lg flex flex-col px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-2 text-primary-default p-1"
          aria-label="Close menu"
        >
          <HiX className="text-3xl" />
        </button>

        <h1 className="pt-8 pb-4 text-2xl border-b border-gray-300 font-semibold text-primary-default">
          Navigate
        </h1>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-4">
            {navLinks.map((link) => {
              const isActive =
                link.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.to);

              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className={`block text-lg py-2 ${
                      isActive
                        ? "text-gray-700 font-semibold"
                        : "text-primary-default hover:text-primary-light"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="py-4 border-t border-gray-300">
          <Link
            to="/cart"
            state={{ from: location?.pathname }}
            onClick={onClose}
            className="flex items-center justify-between"
          >
            <span
              className={
                location.pathname === "/cart"
                  ? "text-gray-700 font-semibold"
                  : "text-primary-default font-medium"
              }
            >
              Your Cart
            </span>
            <div className="relative">
              <HiOutlineShoppingBag className="text-2xl text-primary-default" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-default text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(MobileMenu);
