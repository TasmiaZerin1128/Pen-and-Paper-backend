const express = require('express');
const blogController = require('../controllers/blog.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {blogMiddleware} = require('../middlewares/blog.middleware');

const router = express.Router();

router.route('/').get(blogController.getAllBlogs);
router.route('/').post(authMiddleware.authenticate, blogController.createBlog); 

router.route('/:blogId').get(blogController.getBlogById);
router.route('/:blogId').put(authMiddleware.authenticate, blogMiddleware, blogController.editBlogByBlogId);
router.route('/:blogId').delete(authMiddleware.authenticate, blogMiddleware, blogController.deleteBlogByBlogId);

module.exports = router;