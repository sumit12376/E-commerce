const Order = require('../models/ordermodel');
const User = require('../models/usermodel');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

// Place order using COD
const placeorder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, amount, address } = req.body;
        const orderdata = {
            userId,
            items,
            amount,
            paymentMethod: "COD",
            payment: false,
            address,
            date: Date.now()
        };
        const neworder = new Order(orderdata);
        await neworder.save();
        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.status(200).json({
            success: true,
            message: "Order placed"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Place order using Stripe
const placeorderstripe = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, amount, address } = req.body;
        const { origin } = req.headers;
        const orderdata = {
            userId,
            items,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            address,
            date: Date.now()
        };
        const neworder = new Order(orderdata);
        await neworder.save();
        // await User.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: 'usd', 
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${neworder._id}`,
        });
        res.json({
            success: true,
            session_url: session.url
        });

        // res.status(200).json({success:true, id: session.id });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const verifystripe=async(req,res)=>{

    const userId = req.user.id;
    const{orderId,success}=req.body;
    try {
        if(success=="true"){
      
            await User.findByIdAndUpdate(userId, { cartData: {} });
            await Order.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success:true
            })
        }
        else{
            await Order.findByIdAndDelete(orderId)
            res.json({
                success:"false"
            })
        }
    } catch (error) {
        {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

// Place order using Razorpay (Placeholder)
const placeorderrazorpay = async (req, res) => {
//     try {
//         // Implementation for Razorpay
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
};

// Get all orders for admin
const allorderadmin = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({
            success: true,
            message: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user orders for frontend
const userorder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId });
        res.status(200).json({
            success: true,
            message: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update order status from admin
const updatestatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        res.status(200).json({
            success: true,
            message: "Status updated"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    placeorder,
    placeorderstripe,
 placeorderrazorpay, // Uncomment when implemented
    allorderadmin,
    userorder,
    updatestatus,
    verifystripe
};