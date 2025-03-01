import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { ShopContext } from "../context/Shopcontext";
import Searchbar from "./Searchbar";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { showSearch, setShowSearch, token, settoken,getcart } = useContext(ShopContext);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    settoken(null); 
    localStorage.removeItem("token"); 
    setIsProfileMenuOpen(false);
    navigate("/"); 
  };


  const allowedSearchPages = ["/collection"];

  return (
    <div className="flex flex-col">
   
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md relative">
     
        <Link to="/">
          <img src={assets.logo} className="w-36" alt="Logo" />
        </Link>

    
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 text-gray-700 text-lg">
            {["Home", "Collection", "Contact"].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    isActive ? "underline text-blue-600" : "hover:text-blue-500"
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
            {token ? (
              <li>
           <button 
           onClick={handleLogout} 
           className="bg-red-600 text-white px-3 rounded-lg transition duration-300 hover:bg-red-700 hover:shadow-lg h-8"
         >
           Logout
         </button>  
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "underline text-blue-600" : "hover:text-blue-500"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? "underline text-blue-600" : "hover:text-blue-500"
                    }
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="flex gap-4 items-center">
    
          {allowedSearchPages.includes(location.pathname) && (
            <FaSearch
              className="w-6 h-6 cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
          )}

       
          {token && ( 
            <div className="relative">
              <FaUserCircle
                className="w-6 h-6 cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md text-gray-700"
                  role="menu"
                >
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate('/about')}>about us</li>
                    <li onClick={()=>navigate('/order')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Orders</li>
                  </ul>
                </div>
              )}
            </div>
          )}

   
          {token && (
            <FaShoppingCart
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                getcart(); 
                navigate("/cart");
              }}
            />
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <GiHamburgerMenu className="w-6 h-6" />}
        </button>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeMenu}
        ></div>

        <div
          className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6 md:hidden transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button className="absolute top-4 right-4" onClick={closeMenu}>
            <AiOutlineClose className="w-6 h-6" />
          </button>
          <ul className="flex flex-col gap-6 mt-10 text-lg text-gray-700">
            {["Home", "Collection", "Contact"].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-blue-500"
                  onClick={closeMenu}
                >
                  {item}
                </NavLink>
              </li>
            ))}
           
            {token ? (
         <li>
         <button 
           onClick={handleLogout} 
           className="bg-red-600 text-white px-3 py-2 rounded-lg transition duration-300 hover:bg-red-700 hover:shadow-lg"
         >
           Logout
         </button>  
       </li>
       
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="hover:text-blue-500"
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className="hover:text-blue-500"
                    onClick={closeMenu}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

  
      {allowedSearchPages.includes(location.pathname) && showSearch && <Searchbar />}
    </div>
  );
}

export default Navbar;