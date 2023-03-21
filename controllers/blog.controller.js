const blogService = require("../services/blog.service");
const { sendResponse } = require("../utils/contentNegotiation");

exports.getAllBlogs = async (req, res, next) => {
    try {
    const blogs = await blogService.getAllBlogs();
    // res.status(200).send(blogs.length ? blogs : 'Blog list is empty');
    sendResponse(req, res, 200, blogs.length ? blogs : 'Blog list is empty');
    } catch (err) {
    next(err);
    }
}

exports.createBlog = async (req, res, next) => {
    try {
    const createdBlog = await blogService.createBlog(req.body, req.username);
    res.status(200).json(createdBlog);
    } catch (err) {
        next(err);
    }
}

exports.getBlogbyId = async (req, res, next) => {
    try {
        const blog = await blogService.getBlogbyId(req.params.blogId);
        res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
}

exports.editBlog = async (req, res, next) => {
    try {
    const editedBlog = await blogService.editBlog(req.params.blogId, req.body);
    if(editedBlog[0] == 1){
        res.status(200).json('Blog edited successfully');
    }
    else {
        res.status(404).json('Blog not found');
    }
    } catch (err) {
        next(err);
    }
}

exports.deleteBlog = async (req, res, next) => {
    try{
    const deleteBlog = await blogService.deleteBlog(req.params.blogId);
    if(deleteBlog){
        res.status(200).json('Blog deleted');
    }
    else {
        res.status(404).json('Blog not found');
    }
    } catch (err) {
        next(err);
    }
}
