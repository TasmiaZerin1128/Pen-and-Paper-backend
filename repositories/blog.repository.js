const Blog = require('../models/blog.model');
const BlogDTO = require('../DTOs/blog.dto');
const { SequelizeValidationError } = require("../utils/errorHandler");

exports.getAllBlogs = async (limit, offset) => {
    const result = await Blog.findAll({include : ["author"], offset : offset, limit : limit });
    const allBlog = [];
    result.forEach((element) => {
      allBlog.push( new BlogDTO(element));
    });
    return allBlog;
};

exports.getBlogById = async (blogId) => {
    const result = await Blog.findOne({include : ["author"], where: { id: blogId } });
    return new BlogDTO(result);
};

exports.editBlogByBlogId = async (blogId, editedBlog) => {
    const result = await Blog.update(
      { title: editedBlog.title, 
        description: editedBlog.description },
      { where: { id: blogId } }
    );
    return result;
};

exports.deleteBlogByBlogId = async (blogId) => {
    const result = Blog.destroy({ where: { id: blogId } });
    return result;
};

exports.getBlogByAuthorId = async (authorId) => {
    const result = await Blog.findAll({ where: { authorId: authorId } });
    return result;
};

exports.createBlog = async (blog) => {
  try {
      const result = await Blog.create(blog);
      console.log("Blog created successfully");
      return result;
    } catch (err) {
      throw new SequelizeValidationError(err, 400);
    }
}