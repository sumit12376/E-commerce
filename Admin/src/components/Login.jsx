import React, { useState } from "react";
import axios from "axios";
import { backendurl } from "../App";
import { toast } from "react-toastify";
function Login({setToken}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendurl}/api/user/v1/admin`, { email, password });
   
      if(response.data.success){
        setToken(response.data.token)
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
  
//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Admin Login:", { email, password });
//   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
      
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
