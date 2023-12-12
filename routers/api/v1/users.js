const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/api/v1/auth');

router.post('/signup', authController.signup);

// log user in
router.post('/login', authController.login);

//change password of the user
router.post('/change-password', authController.changePassword);

module.exports = router;    