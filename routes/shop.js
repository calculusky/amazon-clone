const express = require('express');
const router = express.Router();
const { getProducts, getProduct, seedProducts } = require('../controllers/shop');

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

//seed products
router.get('/seeds/products', seedProducts);

module.exports = router;