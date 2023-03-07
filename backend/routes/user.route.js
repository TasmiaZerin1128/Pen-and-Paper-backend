const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(controller.getAllUsers).post(controller.createUser);
router.route('/:id').get(controller.getUserbyId).put(controller.updateUserbyId).delete(controller.deleteUserbyId);

module.exports = router;