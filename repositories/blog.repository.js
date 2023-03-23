const Blog = require('../models/blog.model');
const BlogDTO = require('../DTOs/blog.dto');

exports.getAllBlogs = async (limit, offset) => {
    try {
        const result = await Blog.findAll({ include: ['author'], offset, limit });
        const allBlog = [];
        result.forEach((element) => {
            allBlog.push(new BlogDTO(element));
        });
        return allBlog;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.getBlogbyId = async (blogId) => {
    try {
        const result = await Blog.findOne({ include: ['author'], where: { id: blogId } });
        return new BlogDTO(result);
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.editBlog = async (blogId, editedBlog) => {
    try {
        const result = await Blog.update(
            { title: editedBlog.title, description: editedBlog.description },
            { where: { id: blogId } },
        );
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.deleteBlog = async (blogId) => {
    try {
        const result = Blog.destroy({ where: { id: blogId } });
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.getBlogbyAuthorId = async (authorId) => {
    try {
        const result = await Blog.findAll({ where: { authorId } });
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.createBlog = async (blog) => {
    try {
        const result = await Blog.create(blog);
        console.log('Blog created successfully');
        return result;
    } catch (err) {
        throw console.error(err);
    }
};
