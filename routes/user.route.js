const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(controller.getAllUsers); //.post(controller.createUser);
router.route('/:username').get(controller.getUserByUsername).put(controller.updateUserByUsername).delete(controller.deleteUserByUsername);

module.exports = router;