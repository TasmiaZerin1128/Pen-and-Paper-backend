const blogService = require("../services/blog.service");

exports.getAllBlogs = async (req, res, next) => {
    try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json(blogs.length ? blogs : 'Blog table is empty');
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

exports.getBlogById = async (req, res, next) => {
    try {
        const blog = await blogService.getBlogById(req.params.blogId);
        res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
}

exports.editBlogByBlogId = async (req, res, next) => {
    try {
        console.log("edit");
    const editedBlog = await blogService.editBlogByBlogId(req.params.blogId, req.body);
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

exports.deleteBlogByBlogId = async (req, res, next) => {
    try{
    const deleteBlog = await blogService.deleteBlogByBlogId(req.params.blogId);
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
