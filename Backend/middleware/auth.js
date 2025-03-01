const jwt = require("jsonwebtoken");
require("dotenv").config();

const userauth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
    

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Token not found" });
        }

       
        const token = authHeader.split(" ")[1];
     
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        req.user = decoded;  

        next(); 

    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = userauth;
