const jwt = require('jsonwebtoken');
const config = require('../config')

//generate token
exports.generateToken = (user) => {
    const payload = {
        name: user.name,
        _id: user._id,
        isAdmin: user.isAdmin,
        email: user.email
    }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '12h'});
    return token;
}

//throw error
exports.throwError = ({ message, status }) => {
    const error = new Error(message);
    error.status = status;
    throw error;
}