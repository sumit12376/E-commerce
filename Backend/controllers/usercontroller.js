const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const SECRET_KEY = process.env.JWT_SECRET;


  
//User Login
const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id}, SECRET_KEY);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Use Registration
const userregister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check  user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

 
    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters, include a number & an uppercase letter",
      });
    }


    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error("Password Hashing Error:", hashError.message);
      return res.status(500).json({ success: false, message: "Error hashing password" });
    }


    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, SECRET_KEY);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Admin Login
const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin credentials from .env (or use a database)
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // Generate Admin JWT Token
    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL },
      SECRET_KEY
    );

    res.json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { userlogin, userregister, adminlogin };
