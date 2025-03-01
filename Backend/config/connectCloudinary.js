const cloudinary = require("cloudinary").v2;

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });

        
    } catch (error) {
        console.error("Cloudinary connection failed:", error);
    }
};

module.exports = connectCloudinary;
