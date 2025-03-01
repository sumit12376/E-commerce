import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/Shopcontext';

const OrderItem = ({ order, currency }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-2">
            <p className="text-lg font-semibold text-gray-700">Order ID: {order._id}</p>
            <p className="text-sm text-gray-500">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Amount: {currency} {order.amount?.toFixed(2)}</p>
            <p
  className={`text-sm font-bold ${
    order.status === "Order Placed"
      ? "text-blue-500" 
      : order.status === "Order Cancelled"
      ? "text-red-500" 
      : order.status === "Order Delivered"
      ? "text-green-500" 
      : "text-gray-500" 
  }`}
>
  Status: {order.status}
</p>

            <p className="text-sm text-gray-500">Payment method: {order.paymentMethod
            }</p>

           
            {order.items.length > 0 ? (
                order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 border-t pt-4">
                        <img
                            src={item.image?.[0]}
                            alt={item.name || "Product"}
                            className="w-20 h-20 rounded-lg"
                        />
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{item.name || "Unknown Product"}</p>
                            <p className="text-gray-600">{currency} {item.price?.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                            <p className="text-sm text-gray-500">Size: {item.size }</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No items found for this order.</p>
            )}

          
   
        </div>
    );
};

function Orders() {
    const { token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) return;
    
            const response = await axios.post(
                "http://localhost:3000/api/order/v1/userorders",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
      
    
            setOrderData((response.data.message).reverse()); 
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };
    
    useEffect(() => {
        if (token) {
            loadOrderData();
        }
    }, [token]); 
    

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8 bg-gray-100 min-h-screen">
          
            <div className="flex flex-col items-center gap-4">
                <p className="text-4xl md:text-5xl text-gray-800 uppercase tracking-wider font-bold">
                    MY ORDERS
                </p>
                <div className="w-20 h-1 bg-blue-500 rounded-full" />
            </div>

        
<div className="w-full max-w-6xl flex flex-col gap-10 ">
{orderData.length > 0 ? (
        orderData
        .map((order, i) => (
            <OrderItem key={i} order={order} currency={currency} />
        ))
    ) : (
        <p className="text-gray-500 text-center col-span-full">No orders found.</p>
    )}
</div>

        </div>
    );
}

export default Orders;
