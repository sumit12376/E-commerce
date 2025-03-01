import React, { useState, useEffect } from "react";
import axios from "axios";

function Order({ token }) {
  const [orders, setOrders] = useState([]); 
  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(
        "https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/order/v1/list",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("ordeeeeeeeee",response.data.message);
      setOrders(response.data.message);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
   
  },[token]);


  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        "https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/order/v1/status",
        { orderId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
     
  
  
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {orders.length > 0 ? (
        <ul className="space-y-6">
          {orders
            .slice() //Prevents modifying the original array
            .reverse() //Reverses the order
            .map((order) => (
              <li key={order._id} className="p-4 border rounded-lg shadow-md">
                <p className="font-bold text-gray-800">Order ID: {order._id}</p>
                <p className="text-gray-600">Total Price: ${order.amount.toFixed(2)}</p>
                {/* <p className="text-gray-600">Status: {order.status}</p> */}
                <select
                  className="border p-2 rounded mt-1"
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Order Delivered">Order Delivered</option>
                  <option value="Order Cancelled">Order Cancelled</option>
                </select>
                 <p className="text-gray-600">Address: {order.address.address}</p>
                 <p className="text-gray-600">Name/Phone/Email: {order.address.firstName} {order.address.lastName} / {order.address.phoneNumber} / {order.address.email}
</p>
<p className="text-gray-600">Paymentmethod: {order.address.
paymentMethod
}</p>
              
                <ul className="mt-4 space-y-4">
                  {order.items?.map((item) => (
                    <li key={item._id} className="p-4 border rounded-lg flex items-center gap-4">
                      <img
                        src={item.image?.[0] || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.name} ({item.size || "N/A"})
                        </p>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Order Summary */}
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="font-bold text-gray-800">Total Amount:</span>
                  <span className="text-xl font-bold text-green-600">${order.amount.toFixed(2)}</span>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
}

export default Order;
