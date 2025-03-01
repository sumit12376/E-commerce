import React, { useState, useContext } from "react";
import axios from "axios"; 
import { ShopContext } from "../context/Shopcontext"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom";


 
function Signup() {
  const navigate = useNavigate();
  // Access global state from ShopContext
  const { settoken } = useContext(ShopContext);

  // State to manage form inputs
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (signup.password !== signup.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/user/v1/register', {
        name: signup.name,
        email: signup.email,
        password: signup.password,
      });
  
 
  
      if (response.data.success) {
        toast.success("Signup Successful");
        settoken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response) {
    
        toast.error(error.response.data.message || "An error occurred during signup");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
       
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
              name="name"
              onChange={handleChange}
              value={signup.name}
            />
          </div>

      
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              name="email"
              onChange={handleChange}
              value={signup.email}
            />
          </div>

  
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              name="password"
              onChange={handleChange}
              value={signup.password}
            />
          </div>

   
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
              name="confirmPassword"
              onChange={handleChange}
              value={signup.confirmPassword}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;