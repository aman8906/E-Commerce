import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/products";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-4 sm:px-10 lg:px-20 mt-32 bg-white">
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 mb-10 text-sm">
        {/* Logo & About Section */}
        <div>
          <img className="mb-5 w-32" src={assets.logo} alt="Trendora Logo" />
          <p className="text-gray-600 max-w-md mb-4">
            <b>Trendora</b> is your destination for elevated fashion. We bring the perfect
            mix of trendy designs, everyday comfort, and unmatched quality.
            Join our style journey and never miss out on new arrivals,
            exclusive drops, and fashion inspiration.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg mt-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-110 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:scale-110 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-medium text-xl mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><Link to="/" className="hover:text-black transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-black transition">About Us</Link></li>
            <li><Link to="/collection" className="hover:text-black transition">Collection</Link></li>
            <li><Link to="/contact" className="hover:text-black transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="font-medium text-xl mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>📞 9795XXXXXX</li>
            <li>
              <a href="mailto:trendora@gmail.com" className="hover:text-black transition">
                📧 trendora@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <hr className="border-gray-300" />
      <p className="py-5 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} <b>Trendora</b> – All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
