import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import { useNavigate } from "react-router-dom";
import Placeorder from "./Placeorder";
function Cart() {
  const { products, currency, cartitem, removeFromCart, totalPrices, setTotalPrice} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
const navigate=useNavigate()
  useEffect(() => {
    const tempData = [];

    for (const itemId in cartitem) {
      for (const size in cartitem[itemId]) {
        if (cartitem[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartitem[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartitem]);

  // Calculate total price
  const totalPrice = cartData.reduce((sum, cartItem) => {
    const product = products.find((p) => p._id === cartItem._id);

    const c= product ? sum + product.price * cartItem.quantity : sum;
    setTotalPrice(c)
    return c
  }, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartData.length > 0 ? (
        <>
          <ul className="space-y-4">
            {cartData.map((cartItem) => {
              const product = products.find((p) => p._id === cartItem._id);
              if (!product) return null;

              return (
                <li
                  key={`${cartItem._id}-${cartItem.size}`}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md "
                >
                  <div className="flex items-center">
                    <img
                      src={product.image?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="font-semibold text-lg">{product.name}</p>
                      <p className="text-sm text-gray-600">Size: {cartItem.size}</p>
                      <p className="text-sm text-gray-600">Quantity: {cartItem.quantity}</p>
                      <p className="text-green-600 font-bold mt-1">
                        {currency} {(product.price * cartItem.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(cartItem._id, cartItem.size)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Display total price */}
          

     {/* Display total price */}
<div className="flex items-center gap-2 py-7">
  <p className="md:text-2xl text-gray-600 text-center uppercase tracking-wider font-bold text-3xl">
    Total Price
  </p>
  <div className="w-16 md:w-20 h-[2px] bg-[#414141]" />
</div>
<span className="text-green-600 text-4xl">{currency} {totalPrice.toFixed(2)}</span>
<div className="flex items-center gap-2 py-2"></div>
<button
             onClick={() => {
          
             navigate('/place-order')
            
             }}
            className="mt-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors w-full sm:w-auto "
          >
            BUY NOW
          </button>
        </>
      ) : (
        <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
      )}
   
    </div>
  );
}

export default Cart;
