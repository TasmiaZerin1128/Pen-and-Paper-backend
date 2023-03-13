const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.route('/register').post(controller.getRegistered);
router.route('/login').post(controller.getLoggedIn);

module.exports = router;