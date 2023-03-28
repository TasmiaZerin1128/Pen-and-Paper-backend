const Blog = require('../models/blog.model');
const BlogDTO = require('../DTOs/blog.dto');
const { SequelizeValidationError } = require("../utils/errorHandler");

exports.getAllBlogs = async (limit, offset) => {
  try {
    const result = await Blog.findAll({include : ["author"], offset : offset, limit : limit });
    const allBlog = [];
    result.forEach((element) => {
      allBlog.push( new BlogDTO(element));
    });
    return allBlog;
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
};

exports.getBlogById = async (blogId) => {
  try {
    const result = await Blog.findOne({include : ["author"], where: { id: blogId } });
    return new BlogDTO(result);
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
};

exports.editBlogByBlogId = async (blogId, editedBlog) => {
  try {
    const result = await Blog.update(
      { title: editedBlog.title, 
        description: editedBlog.description },
      { where: { id: blogId } }
    );
    return result;
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
};

exports.deleteBlogByBlogId = async (blogId) => {
  try {
    const result = Blog.destroy({ where: { id: blogId } });
    return result;
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
};

exports.getBlogByAuthorId = async (authorId) => {
  try {
    const result = await Blog.findAll({ where: { authorId: authorId } });
    return result;
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
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