const express = require('express');
const { userlogin, userregister, adminlogin } = require('../controllers/usercontroller');  
const router = express.Router();

// Define API routes
router.post('/register', userregister);  
router.post('/login', userlogin);
router.post('/admin', adminlogin);

module.exports = router;
