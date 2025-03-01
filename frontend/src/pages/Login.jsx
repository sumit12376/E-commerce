import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/Shopcontext"; // Context for global state
import { toast } from "react-toastify"; // Notifications
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); 
  const { settoken } = useContext(ShopContext);


  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/user/v1/login", loginData);

      if (response.data.success) {
        toast.success("Login Successful");

        localStorage.setItem("token", response.data.token);
        settoken(response.data.token); 
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred during login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
        
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              name="email"
              onChange={handleChange}
              value={loginData.email}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              name="password"
              onChange={handleChange}
              value={loginData.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
