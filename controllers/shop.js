const data = require('../data');


exports.getProducts = (req, res, next) => {
    return res.json(data.products);
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.id;
    const product = data.products.find(prod => {
        return prod._id === prodId;
    })
    if(!product){
        const error = new Error('product not found')
        return next(error)
    }
    res.json(product);
}