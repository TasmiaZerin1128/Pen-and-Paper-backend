const blogService = require("../services/blog.service");

exports.getAllBlogs = async (req, res) => {
    try {
    const blogs = await blogService.getAllBlogs();
    if(!blogs){
        res.status(200).json("Blog list empty!");
    }
    res.status(200).json(blogs);
    } catch (err) {
        res.status(err.statusCode).json({error: err.message});
    }
}

exports.createBlog = async (req, res) => {
    try {
    const createdBlog = await blogService.createBlog(req.body);
    res.status(200).json(createdBlog);
    } catch (err) {
        res.status(err.statusCode).json({error: err.message});
    }
}

exports.getBlogbyId = async (req, res) => {
    try {
        const blog = await blogService.getBlogbyId(req.params.blogId);
        res.status(200).json(blog);
    } catch (err) {
        res.status(err.statusCode).json({error: err.message});
    }
}

exports.editBlog = async (req, res) => {
    try {
    const editBlog = await blogService.editBlog(req.body);
    res.status(200).json(editBlog);
    } catch (err) {
        res.status(err.statusCode).json({error: err.message});
    }
}

exports.deleteBlog = async (req, res) => {
    try{
    const deleteBlog = await blogService.deleteBlog(req.params.blogId, req.params.authorId);
    if(deleteBlog){
        res.status(200).json('Blog deleted');
    }
    else {
        res.status(404).json('Blog not found');
    }
    } catch (err) {
        res.status(err.statusCode).json({error: err.message});
    }
}
