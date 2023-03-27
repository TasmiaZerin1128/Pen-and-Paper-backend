const Blog = require('../models/blog.model');
const blogDTO = require('../DTOs/blog.dto');
const { all } = require('../routes');

exports.getAllBlogs = async (limit, offset) => {
  try {
    const result = await Blog.findAll({include : ["author"], offset : offset, limit : limit });
    const allBlog = [];
    result.forEach((element) => {
      allBlog.push( new blogDTO(element));
    });
    return allBlog;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getBlogById = async (blogId) => {
  try {
    const result = await Blog.findOne({include : ["author"], where: { id: blogId } });
    return new blogDTO(result);
  } catch (err) {
    console.log(err.stack);
    throw err;
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
    console.log(err.stack);
    throw err;
  }
};

exports.deleteBlogByBlogId = async (blogId) => {
  try {
    const result = Blog.destroy({ where: { id: blogId } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getBlogByAuthorId = async (authorId) => {
  try {
    const result = await Blog.findAll({ where: { authorId: authorId } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.createBlog = async (blog) => {
  try {
      const result = await Blog.create(blog);
      console.log("Blog created successfully");
      return result;
    } catch (err) {
      throw console.error(err);
    }
}