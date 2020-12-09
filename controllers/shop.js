const data = require('../data');


exports.getProducts = (req, res, next) => {
    return res.json(data.products);
}