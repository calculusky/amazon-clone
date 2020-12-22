const bcrypt = require("bcryptjs");
const data = require("../data");
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








//seed users
exports.seedUsers = async (req, res, next) => {
   try {
    const users = await User.insertMany(data.users);
    res.send(users);

   } catch (error) {
       next(error)
   }
}