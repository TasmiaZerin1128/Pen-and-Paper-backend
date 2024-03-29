const Blog = require('../models/blog.model');
const { SequelizeValidationError } = require("../utils/errorHandler");

exports.getAllBlogs = async (limit, offset) => {
    const result = await Blog.findAndCountAll({include : ["author"], 
    order: [['updatedAt', 'DESC']], offset : offset, limit : limit });
    return result;
};

exports.getBlogById = async (blogId) => {
    const result = await Blog.findOne({include : ["author"], where: { id: blogId } });
    return result;
};

exports.editBlogByBlogId = async (blogId, editedBlog) => {
    const doEdit = await Blog.update(
      { title: editedBlog.title, 
        description: editedBlog.description },
      { where: { id: blogId }}
    );
    if(!doEdit) return false;
    const result = await Blog.findOne({include : ["author"], where: { id: blogId } });
    return result;
};

exports.deleteBlogByBlogId = async (blogId) => {
    const result = Blog.destroy({ where: { id: blogId } });
    return result;
};

exports.getBlogByAuthorId = async (authorId, limit, offset) => {
    const result = await Blog.findAndCountAll({include : ["author"], offset : offset, limit : limit, where: { authorId: authorId }, order: [
      ['updatedAt', 'DESC']] });
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