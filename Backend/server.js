const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const connectdb = require('./config/mongodb.js');
const connectCloudinary = require("./config/connectCloudinary.js");
const userRouter = require('./routes/userrouter.js');
const productRouter = require('./routes/productroute.js');
const cartrouter=require('./routes/cartrouter.js');
const orderrouter = require('./routes/orderroute.js');
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB & Cloudinary
connectdb();
connectCloudinary();

// Routes
app.use('/api/user/v1', userRouter);
app.use('/api/product/v1', productRouter);
app.use('/api/cart/v1',cartrouter)
app.use('/api/order/v1',orderrouter)
// Default Route
app.get('/', (req, res) => {
    res.send("Hi Sumit");
});

// Start server only if MongoDB is connected
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
