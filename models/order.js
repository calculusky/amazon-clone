const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderItems: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        qty: { type: Number, required: true },
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
    }],
    shippingInfo: {
        fullname: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true }
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false }, 
    deliveredAt: { type: Date }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;