const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProduct, 
    seedProducts, 
    order, 
    orderDetails, 
    payOrder, 
    userOrders 
} = require('../controllers/shop');
const { isAuth } = require('../middlewares/auth');

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/order', isAuth, order)
router.get('/orders/:orderId', isAuth, orderDetails);
router.put('/orders/:orderId/pay', isAuth, payOrder);
router.get('/userorders', isAuth, userOrders);

//seed products
router.get('/seeds/products', seedProducts);

module.exports = router;