const data = require('../data');
const Order = require('../models/order');
const Product = require('../models/product');
const { throwError } = require('../utilities/helper')



exports.getProducts = async (req, res, next) => {
   try {
       const products = await Product.find();
       if(!products){
           throwError({ message: 'product not found', status: 404 })
       }
       res.json(products)
       
   } catch (error) {
       next(error);
   }
}

exports.getProduct = async (req, res, next) => {
    const prodId = req.params.id;
   try {
    const product = await Product.findById(prodId) 
    if(!product){
        const error = {
            message: 'product not found',
            status: 404
        }
        throwError(error);
    }
    res.json(product);

   } catch (error) {
       next(error);
   }
}

//order
exports.order = async (req, res, next) => {
    const userId = req.user._id;
    const { 
        orderItems, 
        shippingInfo, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice } = req.body;

    try {
        if(!userId){
            throwError({
                message: 'Not authenticated',
                message: 401
            });
        }
        const order = new Order({
            orderItems,
            shippingInfo,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            userId
        });
        const savedOrder = await order.save();
        return res.json({ message: 'Order successfully created', order: savedOrder, status: 201 });

    } catch (error) {
        next(error);
    }
}

exports.orderDetails = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
       const order = await Order.findById(orderId);
       if(!order){
           throwError({
               message: 'Order not found',
               status: 404
           })
       }
       res.json({ success: true, order: order })
        
    } catch (error) {
        next(error)
    }
}

exports.payOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    const { id, status, payer: { email_address }, update_time } = req.body;
   try {
    const order = await Order.findById(orderId);
    if(!order){
        throwError({
            message: 'Order not found',
            status: 404
        })
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id,
        status,
        email_address,
        update_time
    }
    const updatedOrder = await order.save();
    res.json({ message: 'payment successful', order: updatedOrder });

   } catch (error) {
       next(error);
   }
}

//user orders
exports.userOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        if(!orders){
            throwError({
                message: 'No order found',
                status: 404
            })
        }
        res.json({ success: true, orders: orders});

    } catch (error) {
        next(error);
    }
}






//seed for product
exports.seedProducts = async (req, res, next) => {
   try {
    const products = await Product.insertMany(data.products);
    res.json(products)

   } catch (error) {
       next(error)
   }

}