const express = require('express');
const { seedUsers, signin, signup } = require('../controllers/auth');
const router = express.Router();

router.post('/auth/signin', signin);
router.post('/auth/signup', signup)



router.get('/seeds/users', seedUsers);

module.exports = router;