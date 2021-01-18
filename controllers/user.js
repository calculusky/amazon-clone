const User = require("../models/user");
const { throwError } = require("../utilities/helper");


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