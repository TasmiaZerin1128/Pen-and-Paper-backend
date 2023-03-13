const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.route('/register').post(controller.getRegistered);

module.exports = router;