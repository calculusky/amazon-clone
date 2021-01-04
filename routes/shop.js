const express = require('express');
const router = express.Router();
const { getProducts, getProduct, seedProducts, order } = require('../controllers/shop');
const { isAuth } = require('../middlewares/auth');

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/order', isAuth, order)

//seed products
router.get('/seeds/products', seedProducts);

module.exports = router;