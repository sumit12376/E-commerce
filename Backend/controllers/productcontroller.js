const cloudinary = require('cloudinary').v2;
const Product = require('../models/productmodel');

// Add product
const addproduct = async (req, res) => {
    try {
        // Extract product details
        const { name, description, price, category, subcategory, size, bestseller } = req.body;

        // Ensure files exist
        if (!req.files || !req.files["images"]) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

   
        // Upload images to Cloudinary
        let imageUrls = await Promise.all(
            req.files["images"].map(async (file) => {
                let result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });//{ resource_type: "image" }: Specifies that the file is an image.
                return result.secure_url;
            })
        );


        const sizeArray = JSON.parse(size);

     
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subcategory,
            size: sizeArray,
            bestseller: bestseller === "true", 
            image: imageUrls,
            date: new Date(),
        };

        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: savedProduct
        });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


const removeproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: "Product not found" });
        }
    
        res.json({ success: true, message: "Product removed successfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
};


const listproduct = async (req, res) => {
    try {
        const products=await Product.find({

        })
        res.status(200).json({
            success:true,
            message:products
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
};


const singleproduct = async (req, res) => {
    try {
        const { productId } = req.body; 

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
       
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addproduct, removeproduct, singleproduct, listproduct };
