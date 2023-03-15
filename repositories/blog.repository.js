const Blog = require('../models/blog.model');

exports.getAllBlogs = async () => {
  try {
    const result = await Blog.findAll();
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getBlogbyId = async (blogId) => {
  try {
    const result = await Blog.findOne({ where: { id: blogId } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.updateBlog = async (blogId, updatedTitle, updatedDescription) => {
  try {
    const result = await Blog.update(
      { title: updatedTitle, description: updatedDescription },
      { where: { id: blogId } }
    );
    console.log(result);
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
    const result = await Blog.findOne({ where: { authorId: authorId } });
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