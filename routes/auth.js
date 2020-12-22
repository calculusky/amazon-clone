const express = require('express');
const { seedUsers, signin } = require('../controllers/auth');
const router = express.Router();

router.post('/auth/signin', signin);



router.get('/seeds/users', seedUsers);

module.exports = router;