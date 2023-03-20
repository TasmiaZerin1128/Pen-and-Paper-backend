const express = require('express');
const blogController = require('../controllers/blog.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {blogMiddleware} = require('../middlewares/blog.middleware');

const router = express.Router();

router.route('/').get(blogController.getAllBlogs);
router.route('/').post(authMiddleware.guard, blogController.createBlog); 

router.route('/:blogId').get(blogController.getBlogbyId);
router.route('/:blogId').put(authMiddleware.guard, blogMiddleware, blogController.editBlog);
router.route('/:blogId').delete(authMiddleware.guard, blogMiddleware, blogController.deleteBlog);

module.exports = router;