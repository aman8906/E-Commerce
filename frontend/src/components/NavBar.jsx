import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/products";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef();
  const {
    setShowSearch,
    setToken,
    setCartItems,
    getCartCount,
    token,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("trendora_user");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpenModal(false);
    const handleClickOutside = (e) => {
      if (openModal && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = openModal ? "hidden" : "auto";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  return (
    <header className="relative z-50">
      <nav className="flex items-center justify-between py-2 px-5 sm:px-10 bg-white shadow-md w-full">
        {/* Logo */}
        <Link to="/" className="z-50 pl-2 sm:pl-3">
          <img className="w-28 sm:w-28 object-contain" src={assets.logo} alt="logo" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
          <NavLink to="/" className="hover:text-black">HOME</NavLink>
          <NavLink to="/collection" className="hover:text-black">COLLECTIONS</NavLink>
          <NavLink to="/about" className="hover:text-black">ABOUT</NavLink>
          <NavLink to="/contact" className="hover:text-black">CONTACT</NavLink>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-5 sm:gap-7 pr-2 sm:pr-4 z-50">
          {/* Search Icon */}
          <img
            onClick={() => setShowSearch(true)}
            className="w-5 cursor-pointer"
            src={assets.search_icon}
            alt="search"
          />

          {/* Profile Icon */}
<div className="group relative">
  <img
    onClick={() => token ? null : navigate("/login")}
    className="w-6 cursor-pointer" // thoda bada icon
    src={assets.profile_icon}
    alt="profile"
  />
  {token && (
    <div className="hidden group-hover:block absolute top-8 right-0 bg-white rounded-lg shadow-lg p-4 min-w-[160px] text-base text-gray-700 z-50">
      <p
        onClick={() => navigate("/profile")}
        className="cursor-pointer py-1 hover:text-black"
      >
        My Profile
      </p>
      <p
        onClick={() => navigate("/orders")}
        className="cursor-pointer py-1 hover:text-black"
      >
        Orders
      </p>
      <p
        onClick={logout}
        className="cursor-pointer py-1 hover:text-black"
      >
        Logout
      </p>
    </div>
  )}
</div>


          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <img className="w-5" src={assets.cart_icon} alt="cart" />
            <p className="absolute -right-1 -bottom-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setOpenModal(!openModal)}
            className="sm:hidden z-50 p-2 bg-white border rounded shadow-md"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-5 flex flex-col justify-between">
              <span className={`h-[2px] bg-black transition-transform duration-300 ${openModal ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`h-[2px] bg-black transition-opacity duration-300 ${openModal ? "opacity-0" : "opacity-100"}`} />
              <span className={`h-[2px] bg-black transition-transform duration-300 ${openModal ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </div>
          </button>
        </div>

        {/* Overlay */}
        {openModal && (
          <div
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          />
        )}

        {/* Mobile Sidebar Menu */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full bg-black text-white z-50 shadow-md transition-all duration-300 ease-in-out overflow-y-auto ${
            openModal ? "w-[80%] sm:w-[50%] px-6" : "w-0 px-0"
          }`}
        >
          <div className="mt-20 flex flex-col gap-4 text-white text-sm">
            <NavLink to="/" onClick={() => setOpenModal(false)} className="border-b py-2">HOME</NavLink>
            <NavLink to="/collection" onClick={() => setOpenModal(false)} className="border-b py-2">COLLECTIONS</NavLink>
            <NavLink to="/about" onClick={() => setOpenModal(false)} className="border-b py-2">ABOUT</NavLink>
            <NavLink to="/contact" onClick={() => setOpenModal(false)} className="border-b py-2">CONTACT</NavLink>

            {token && (
              <>
                <hr className="my-2 border-gray-500" />
                <p className="text-xs text-gray-400">ACCOUNT</p>
                <p
                  onClick={() => {
                    navigate("/profile");
                    setOpenModal(false);
                  }}
                  className="cursor-pointer border-b py-2 hover:text-gray-300"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/orders");
                    setOpenModal(false);
                  }}
                  className="cursor-pointer border-b py-2 hover:text-gray-300"
                >
                  Orders
                </p>
                <p
                  onClick={() => {
                    logout();
                    setOpenModal(false);
                  }}
                  className="cursor-pointer border-b py-2 text-red-500 hover:text-red-700"
                >
                  Logout
                </p>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
