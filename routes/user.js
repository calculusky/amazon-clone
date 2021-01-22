const express = require('express');
const { userDetails, updateUserProfile } = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const router = express.Router();

router.get('/user/details/:userId', isAuth, userDetails);
router.put('/user/updateprofile/:userId', isAuth, updateUserProfile);

module.exports = router;