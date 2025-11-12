const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/sign-in', authController.login);

router.post('/sign-up', authController.register);

module.exports = router;