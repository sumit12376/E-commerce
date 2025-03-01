import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";

function Navbar({ setToken, token }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setToken(""); 
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <nav className="bg-white text-black p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={assets.logo} alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {["/", "/order", "/list"].map((path, index) => (
            <Link
              key={index}
              to={path}
              className={`hover:text-yellow-500 transition duration-300 ${
                isActive(path) ? "font-bold border-b-2 border-yellow-500" : ""
              }`}
            >
              {path === "/" ? "Add" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md 
                       hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-white shadow-md absolute top-full left-0 w-full p-4 space-y-4">
          {["/", "/order", "/list"].map((path, index) => (
            <Link
              key={index}
              to={path}
              className={`py-2 text-center hover:text-yellow-500 transition duration-300 ${
                isActive(path) ? "font-bold " : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {path === "/" ? "Add" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}

          {/* Mobile Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="py-2 text-center bg-red-500 text-white rounded-lg font-semibold 
                        hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
