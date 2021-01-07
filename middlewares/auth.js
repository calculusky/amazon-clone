const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { throwError } = require('../utilities/helper');

exports.isAuth = async (req, res, next) => {
    //check if token exists
    const authHeader = req.headers['authorization'];

    try {       
        if(!authHeader){
            throwError({
                message: 'Authentication failed',
                status: 401
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = await jwt.verify(token, jwtSecret);
        if(!decoded){
            throwError({
                message: 'Authentication failed',
                status: 401
            });
        }
        req.user = decoded;
        return next();

    } catch (error) {
        // if(error.message === 'jwt expired' || error.message === 'invalid token'){
        //     error.message = 'Authentication failed';
        // }
        next(error);
    }
}