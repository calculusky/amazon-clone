const data = require('../data');
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

//seed for product
exports.seedProducts = async (req, res, next) => {
   try {
    const products = await Product.insertMany(data.products);
    res.json(products)

   } catch (error) {
       next(error)
   }

}