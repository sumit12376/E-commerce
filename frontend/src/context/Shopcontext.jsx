import { createContext, useEffect, useState } from "react";
import axios from "axios"; 
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartitem, setcartitem] = useState({});
  const [products, setproducts] = useState([]);
  const [token, settoken] = useState("");
  const [totalPrices, setTotalPrice] = useState(0);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      settoken(storedToken);
    }
  }, []); 

  const addtocart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }
  
    if (token) {
      try {
        const response = await axios.post(
         "https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/cart/v1/addtocart",
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
      
        toast.success("Added to cart");
      } catch (error) {
        console.error("Error adding to cart:", error.response || error); 
        toast.error(error.response?.data?.message || "Failed to add to cart");
      }
    } else {
      toast.error("User not authenticated");
    }
  };


  const getcart = async () => { 
    if (token) {
      try {
        const response = await axios.get(
          "https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/cart/v1/getcart",
          { headers: { Authorization: `Bearer ${token}` } } 
        );
        
        setcartitem(response.data.cart); 
       
        
      } catch (error) {
        console.error("Error fetching cart:", error.response || error); 
        toast.error(error.response?.data?.message || "Failed to fetch cart");
      }
    }
  };
  
  const removeFromCart = async (itemId, size) => {
    if (token) {
      try {
        const response = await axios.put(
          "https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/cart/v1/update",
          { itemId, size, quantity: 0 }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        setcartitem(response.data.cart);
        toast.success("Item removed from cart");
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error(error.response?.data?.message || "Failed to remove item");
      }
    } else {
      toast.error("User not authenticated");
    }
  };


  const getproductdata = async () => {
    try {
      const response = await axios.get("https://elitemart-sumit-vikram-singhs-projects.vercel.app/api/product/v1/list");
      setproducts(response.data.message);
     
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {

    getproductdata();
  }, []);

  useEffect(() => {
    if (token) {
      getcart();
    }
  }, [token]);
  

  const value = {
    products,
    currency,
    showSearch,
    setShowSearch,
    searchQuery,
    setSearchQuery,
    cartitem,
    addtocart,
    setcartitem,
    backendurl,
    token,
    settoken,
    getcart,removeFromCart, totalPrices, setTotalPrice
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
