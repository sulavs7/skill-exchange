const User = require('../models/userModel'); // Adjust the path as needed

const express = require('express');
const router = express.Router();
const productRegisterController = require('../controllers/productRegisterController');

router.get('/tourist-pov', (req, res) => {
  res.render('tourist-pov.ejs');
});

router.get('/local-pov', (req, res) => {
  res.render('local-pov.ejs');
});
router.get('/product-register', (req, res) => {
  res.render('product-register.ejs');
});

router.get('/tourist-product-select', async (req, res) => {
  try {
    const potteryUsers = await User.find({ role: 'local', category: 'Pottery' });
    res.render('tourist-product-select', { potteryUsers });
  } catch (error) {
    console.error('Error fetching pottery users:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/booking', (req, res) => {
  res.render('booking.ejs');
});

// Route for handling product registration
router.post('/product-register', productRegisterController.registerProduct);
router.get("/payment", (req, res) => {
  res.render("payment.ejs");
})

module.exports = router;

