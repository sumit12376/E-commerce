const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminauth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
   

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Token not found" });
        }

      
        const token = authHeader.split(" ")[1];
      

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        req.admin = decoded; 
        next(); 

    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = adminauth;
