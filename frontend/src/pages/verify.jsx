import React, { useState, useContext,useEffect } from "react";
import axios from "axios"; 
import { ShopContext } from "../context/Shopcontext"; 
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function verify() {
const{token,cartitem,setcartitem}=useContext(ShopContext)
const[searchParams,setSearchParams]=useSearchParams()
const success=searchParams.get('success')
const orderId=searchParams.get('orderId')
const navigate=useNavigate()
useEffect(() => {
  const verifyPayment = async () => {
      try {
          if (!token) return;


          const response = await axios.post(
              "https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/order/v1/verify",
              { success, orderId },
              { headers: { Authorization: `Bearer ${token}` } }
          );


          if (response.data.success) {
              navigate("/order");
              setTimeout(() => {
                  setcartitem({}); 
              }, 500);
          } else {
              navigate("/cart");
          }
      } catch (error) {
          console.error("Payment verification failed:", error);
          navigate("/cart");
      }
  };

  verifyPayment();
}, [token, success, orderId, setcartitem]);
  return (
    <div>
    <p className="font-bold w-2xl">verify Payment...</p>
    </div>
  )
}

export default verify
