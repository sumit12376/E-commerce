import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";

import { toast } from "react-toastify";
function Placeorder() {
  const { cartitem, products, totalPrices, token,setcartitem} = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    pinCode: "",
    phoneNumber: "",
    paymentMethod: "",
  });

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handlesubmission
  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      let orderItems = [];
  
      for (const itemId in cartitem) {
        for (const size in cartitem[itemId]) {
          if (cartitem[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === itemId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartitem[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }
  
      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalPrices,
      };
  
      if (!formData.paymentMethod) {
        toast.error("Please select a payment method.");
        return;
      }
  
      let response;
      switch (formData.paymentMethod) {
        case "cash":
          response = await axios.post(
            "https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/order/v1/place",
            orderData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          break;
  
      
  
          case "stripe":
            response = await axios.post(
                "https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/order/v1/stripe",
                orderData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.data.success) {
                const { session_url } = response.data; 
                window.location.replace(session_url);
                // navigate('/order')
            } else {
                toast.error(response.data.message);
            }
            // navigate(``)
            break;
  
        default:
          toast.error("Invalid payment method.");
          return;
      }
  
      if (response.data.success) {
        setcartitem({});
        navigate("/order");
      
        toast.success("Order placed successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order.");
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] px-6">
      
      <div className="flex flex-col gap-6 w-full md:max-w-[480px]">
        <div className="flex items-center gap-2 py-5">
          <p className="text-gray-600 uppercase tracking-wider font-bold text-3xl">Information</p>
          <div className="w-16 md:w-20 h-[2px] bg-[#414141]" />
        </div>

        <p className="text-3xl font-extrabold text-blue-600  p-4 rounded-lg shadow-lg">
  Total Price: <span className="text-green-500">${totalPrices}</span>
</p>



        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border border-gray-300 rounded py-2 px-3 w-full focus:ring-2 focus:ring-gray-400" placeholder="First Name" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border border-gray-300 rounded py-2 px-3 w-full focus:ring-2 focus:ring-gray-400" placeholder="Last Name" />
          </div>

          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded py-2 px-3 w-full focus:ring-2 focus:ring-gray-400" placeholder="Email Address" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="border border-gray-300 rounded py-2 px-3 w-full focus:ring-2 focus:ring-gray-400" placeholder="Shipping Address" />

          <div className="flex gap-3">
            <input type="number" name="pinCode" value={formData.pinCode} onChange={handleChange} className="border border-gray-300 rounded py-2 px-3 w-full focus:ring-2 focus:ring-gray-400" placeholder="Pin Code" />
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border border-gray-300 rounded py-2 px-3 w-full focus:ring-2 focus:ring-gray-400" placeholder="Phone Number" />
          </div>

     
        </div>
      </div>

      {/* Right Section - Payment */}
      <div className="flex flex-col w-full md:max-w-[480px]">
        <div className="flex items-center gap-2 py-5">
          <p className="text-gray-600 uppercase tracking-wider font-bold text-3xl">Payment</p>
          <div className="w-16 md:w-20 h-[2px] bg-[#414141]" />
        </div>

        {/* Payment Options */}
        <div className="flex flex-col gap-4">
         

          <label className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md">
            <input type="radio" name="paymentMethod" value="stripe" checked={formData.paymentMethod === "stripe"} onChange={handleChange} className="w-4 h-4" />
            <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
          </label>

          <label className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md">
            <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === "cash"} onChange={handleChange} className="w-4 h-4" />
            <span className="text-gray-700 text-sm font-bold">Cash on Delivery</span>
          </label>
        </div>

        <button className="bg-gray-800 text-white font-semibold py-2 my-4 px-4 rounded hover:bg-gray-900 transition duration-200" onClick={handleSubmit}>
            Place Order
          </button>
      </div>
    </div>
  );
}

export default Placeorder;
