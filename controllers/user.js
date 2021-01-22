const User = require("../models/user");
const { throwError, generateToken } = require("../utilities/helper");
const bcrypt = require('bcryptjs');


exports.userDetails = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if(!user){
            throwError({
                message: 'User not found',
                status: 404
            })
        }
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
        res.json({ success: true, user: data });
        
    } catch (error) {
        next(error);
    }
}

exports.updateUserProfile = async (req, res, next) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await User.findById(userId);
        if(!user){
            throwError({
                message: 'User not found',
                status: 404
            })
        }
        //update user info
        user.name = name;
        user.email = email;
        if(password){
            const harshedPassword = await bcrypt.hash(password, 12);
            user.password = harshedPassword;
        }
        const updatedUser = await user.save(); 
        const data = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        }
        res.json({ success: true, updatedUser: data })

    } catch (error) {
        next(error);
    }

}