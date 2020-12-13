const express = require('express');
const router = express.Router();
const { getProducts, getProduct } = require('../controllers/shop');

router.get('/products', getProducts);
router.get('/product/:id', getProduct);

module.exports = router;