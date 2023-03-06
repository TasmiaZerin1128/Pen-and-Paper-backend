const express = require('express');
const controller = require('../controllers/auth.controller')

const router = express.Router();

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getIndUser)

module.exports = router;