const bcrypt = require("bcryptjs");
const { payPalClientId, jwtSecret } = require("../config");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { throwError, generateToken } = require("../utilities/helper");

//login
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email});
        if(!user){
            throwError({ message: 'Incorrect email or password', status: 401})
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            throwError({ message: 'Incorrect email or password', status: 401})
        }
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        }      
        return res.json(data);

    } catch (error) {
        next(error);
    }
}

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email: email});
        if(user){
            throwError({ message: 'Account already exists', status: 422 })
        }
        const harshedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name: name,
            email: email,
            password: harshedPassword,
        });
        const createdUser = await newUser.save();
        const data = {
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        }      
        return res.json(data);

    } catch (error) {
        next(error);
    }
}

//check validity of token
exports.isTokenValid = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        throwError({
            message: 'Authentication failed',
            status: 401
        })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedUser = await jwt.verify(token, jwtSecret);
        if(decodedUser){
            res.json({ message: 'valid token', success: true })
        }

    } catch (error) {
        next(error)
    }
}





//send paypal client id to the frontend
exports.getPayPalClientId = (req, res, next) => {
    res.send(payPalClientId);
}



//seed users
exports.seedUsers = async (req, res, next) => {
   try {
    const users = await User.insertMany(data.users);
    res.send(users);

   } catch (error) {
       next(error)
   }
}