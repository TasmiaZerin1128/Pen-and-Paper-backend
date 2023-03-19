const express = require('express');
const blogController = require('../controllers/blog.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').get(blogController.getAllBlogs);
router.route('/').post(authMiddleware, blogController.createBlog); 

router.route('/:blogId').get(blogController.getBlogbyId);
router.route('/:blogId').put(authMiddleware, blogController.editBlog);
router.route('/:blogId').delete(authMiddleware, blogController.deleteBlog);

module.exports = router;