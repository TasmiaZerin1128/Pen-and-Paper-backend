const express = require('express');
const controller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').get(controller.getAllUsers); //.post(controller.createUser);
router.route('/:username').get(controller.getUserByUsername)
    .put(authMiddleware.authenticate, authMiddleware.authorize, controller.updateUserByUsername)
    .delete(authMiddleware.authenticate, authMiddleware.authorize, controller.deleteUserByUsername);

module.exports = router;