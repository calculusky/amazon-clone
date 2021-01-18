const express = require('express');
const { userDetails } = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const router = express.Router();

router.get('/user/details/:userId', isAuth, userDetails);

module.exports = router;