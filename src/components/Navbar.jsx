import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineViewList } from "react-icons/hi";
import MobileMenu from "./MobileMenu";

function Navbar({ count }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = useMemo(
    () => [
      { name: "Home", to: "/" },
      { name: "Products", to: "/products" },
      { name: "About", to: "/about" },
      { name: "Contact", to: "/contact" },
      { name: "Login", to: "/login" },
    ],
    []
  );

  const openMobileMenu = useCallback(() => setMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    closeMobileMenu();
  }, [location, closeMobileMenu]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="bg-white py-4 px-2">
        <div className="flex items-center justify-between mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <Link to="/">
            <img
              src="/images/amazonlogo.svg"
              alt="Logo"
              className="h-16 sm:h-20"
            />
          </Link>

          <button
            className="sm:hidden text-primary-default hover:text-primary-dark"
            onClick={openMobileMenu}
            aria-label="Open menu"
          >
            <HiOutlineViewList className="text-3xl" />
          </button>

          <nav className="hidden sm:flex items-center">
            <ul className="flex">
              {navLinks.map((link) => {
                const isActive =
                  link.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.to);

                return (
                  <li
                    key={link.to}
                    className={`mx-2 text-sm ${
                      isActive
                        ? "text-gray-700 font-semibold"
                        : "text-primary-default hover:text-primary-light"
                    }`}
                  >
                    <Link to={link.to}>{link.name}</Link>
                  </li>
                );
              })}
            </ul>

            <Link
              to="/cart"
              state={{ from: location?.pathname }}
              className="ml-6 flex flex-col items-center relative"
            >
              <HiOutlineShoppingBag className="text-4xl text-primary-default" />
              {count > 0 && (
                <span className="absolute top-4 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={closeMobileMenu}
          navLinks={navLinks}
          count={count}
          location={location}
        />
      )}
    </>
  );
}

export default Navbar;
