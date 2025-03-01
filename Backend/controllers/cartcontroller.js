const User = require("../models/usermodel"); 

const addtocart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { itemId, size } = req.body;
  
      const userData = await User.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData || {};
  
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = { [size]: 1 };
      }
  
      await User.findByIdAndUpdate(userId, { $set: { cartData } });
  
      res.status(200).json({
        success: true,
        message: "Added to cart",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Function to get user cart
const getusercart = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const cartData = user.cartData || {};

      res.status(200).json({ success: true, cart: cartData });
    } catch (error) {
      console.error("Error fetching user cart:", error); 
      res.status(500).json({ success: false, message: error.message });
    }
  };


const updatetocart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId, size } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        let cart = user.cartData || {};

        if (cart[itemId]?.[size]) {
            cart[itemId][size] > 1 ? cart[itemId][size]-- : delete cart[itemId][size];

            if (Object.keys(cart[itemId]).length === 0) delete cart[itemId];
        } else {
            return res.status(400).json({ success: false, message: "Item not in cart" });
        }

        await User.findByIdAndUpdate(userId, { cartData: cart }, { new: true });

        res.json({ success: true, message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addtocart, getusercart, updatetocart };
