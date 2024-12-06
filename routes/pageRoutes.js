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
router.get('/tourist-product-select', (req, res) => {
  res.render('tourist-product-select.ejs');
});

// Route for handling product registration
router.post('/product-register', productRegisterController.registerProduct);

module.exports = router;
