const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const blogRouter = require('./blog.route');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/blogs', blogRouter);

module.exports = router;