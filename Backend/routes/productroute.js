const express = require('express');
const { addproduct, removeproduct, singleproduct, listproduct } = require('../controllers/productcontroller');  
const upload = require('../middleware/multer');
const adminauth = require('../middleware/Adminauth');

const productrouter = express.Router(); 

// Routes
productrouter.post(
    "/add",
    adminauth,
    upload.fields([
        { name: "images", maxCount: 4 } 
    ]),
    addproduct
);
productrouter.post('/remove/:id', adminauth, removeproduct);

productrouter.post('/single', singleproduct);
productrouter.get('/list', listproduct);

module.exports = productrouter; 
