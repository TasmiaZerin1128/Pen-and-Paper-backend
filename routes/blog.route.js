const express = require('express');
const blogController = require('../controllers/blog.controller');

const router = express.Router();

router.route('/').get(blogController.getAllBlogs)
    .post(blogController.createBlog); 

router.route('/:blogId').get(blogController.getBlogbyId);

router.route('/:authorId/:blogId')
    .put(blogController.editBlog)
    .delete(blogController.deleteBlog);

module.exports = router;