const blogService = require("../services/blog.service");

exports.getAllBlogs = async (req, res) => {
    const blogs = await blogService.getAllBlogs();
    res.status(200).send(blogs);
}

exports.createBlog = async (req, res) => {
    const createdBlog = await blogService.createBlog(req.body);
    res.status(200).send('Getting all users');
}

exports.getBlogbyId = async (req, res) => {
    const blog = await blogService.getBlogbyId(req.body);
    res.status(200).send('Getting all users');
}

exports.editBlog = async (req, res) => {
    const editBlog = await blogService.editBlog(req.body);
    res.status(200).send('Getting all users');
}

exports.deleteBlog = async (req, res) => {
    const deleteBlog = await blogService.deleteBlog(req.body);
    res.status(200).send('Getting all users');
}
