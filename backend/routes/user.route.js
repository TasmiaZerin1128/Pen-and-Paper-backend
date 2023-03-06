const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(controller.getAllUsers).post(controller.createUser);
router.route('/:id').get(controller.getSingleUser).put(controller.updateUser).delete(controller.deleteUser);

module.exports = router;