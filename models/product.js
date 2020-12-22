const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    numReviews: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;