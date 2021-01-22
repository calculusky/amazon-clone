const express = require('express');
const { seedUsers, signin, signup, getPayPalClientId, isTokenValid } = require('../controllers/auth');
const router = express.Router();

router.post('/auth/signin', signin);
router.post('/auth/signup', signup)
router.get('/config/paypal', getPayPalClientId)
router.get('/validatetoken', isTokenValid);



router.get('/seeds/users', seedUsers);

module.exports = router;