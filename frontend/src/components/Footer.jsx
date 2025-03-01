import React from "react";
import { assets } from "../assets/assets";
import { FaInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="bg-gray-50 py-10 mt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          <div className="text-center sm:text-left">
            <img src={assets.logo} alt="Logo" className="w-32 mx-auto sm:mx-0" />
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              At our company, we are committed to delivering high-quality products that meet the diverse needs of our customers.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-gray-800 mb-4">COMPANY</p>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 hover:text-gray-800 transition duration-300">About Us</a></li>
         
              <li><a href="/contact" className="text-gray-600 hover:text-gray-800 transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-gray-800 mb-4">GET IN TOUCH</p>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: <a href="mailto:example@email.com" className="hover:text-gray-800 transition duration-300">example@email.com</a></li>
              <li className="text-gray-600">Phone: <a href="tel:+123456789" className="hover:text-gray-800 transition duration-300">+123 456 789</a></li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-gray-800 mb-4">FOLLOW US</p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition duration-300">
              Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition duration-300">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition duration-300">
                Linkedin
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-600">
            Copyright © 2024 <a href="/" className="hover:text-gray-800 transition duration-300">forever.com</a> - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;