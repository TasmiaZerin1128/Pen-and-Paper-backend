const blogService = require("../services/blog.service");

exports.getAllBlogs = async (req, res) => {
    try {
    const blogs = await blogService.getAllBlogs();
    if(blogs.length==0){
        res.status(200).json('Blog list empty!');
    }
    res.status(200).json(blogs);
    } catch (err) {
    next(err);
    }
}

exports.createBlog = async (req, res) => {
    try {
    const createdBlog = await blogService.createBlog(req.body, req.username);
    res.status(200).json(createdBlog);
    } catch (err) {
        next(err);
    }
}

exports.getBlogbyId = async (req, res) => {
    try {
        const blog = await blogService.getBlogbyId(req.params.blogId);
        res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
}

exports.editBlog = async (req, res) => {
    try {
    const editedBlog = await blogService.editBlog(req.params.blogId, req.body);
    if(editedBlog[0] == 1){
        res.status(200).json('Blog edited successfully');
    }
    else {
        res.status(400).json('Blog could not be edited. Please try again');
    }
    } catch (err) {
        next(err);
    }
}

exports.deleteBlog = async (req, res) => {
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
