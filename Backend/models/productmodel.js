const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {  
        type: String,
        required: true
    },
    subcategory: { 
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    bestseller: {
        type: Boolean,
        default:false
    },
    date: {
        type: Number,
        required: true
    }
}, { timestamps: true });  

// Corrected model declaration
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
