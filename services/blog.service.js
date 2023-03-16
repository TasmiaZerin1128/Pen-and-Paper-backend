const blogRepository = require("../repositories/blog.repository");
const ValidationError = require("../utils/errorHandler");

("use strict");

async function createBlog(blog) {
  if (!blog.title || !blog.description) {
    throw new ValidationError("Title and description are needed", 400, false);
  }
  if (!blog.authorId) {
    throw new ValidationError(
      "Author Id needed for creating a blog",
      400,
      false
    );
  }

  try {
    const result = await blogRepository.createBlog(blog);
    return result;
  } catch (err) {
    throw new Error(err.message, 500);
  }
}

async function getAllBlogs() {
  try {
    const data = await blogRepository.getAllBlogs();
    return data;
  } catch {
    return new Error("Cannot find any Blogs table", 404);
  }
}

async function editBlog(blogId, blogToEdit) {
  try {
    const blogExists = await getBlogbyId(blogId);
    if (blogExists) {
      if (blogExists.authorId == blogToEdit.authorId) {
        const result = await blogRepository.editBlog(blogId, blogToEdit);
        return result;
      } else {
        throw new ValidationError(
          "You do not have permission to edit this blog!",
          403,
          false
        );
      }
    } else {
      throw new ValidationError("Blog not found", 404, false);
    }
  } catch (err) {
    throw err;
  }
}

async function deleteBlog(blogId, authorId) {
  try {
    const blogExists = await getBlogbyId(blogId);
    if (blogExists) {
      if (blogExists.authorId == authorId) {
        const result = await blogRepository.deleteBlog(blogId);
        return result;
      } else {
        throw new ValidationError(
          "You do not have permission to delete this blog!",
          403,
          false
        );
      }
    } else {
      throw new ValidationError("Blog does not exist", 404, false);
    }
  } catch (err) {
    throw err;
  }
}

async function getBlogbyId(blogId) {
  try {
    const result = await blogRepository.getBlogbyId(blogId);
    return result;
  } catch {
    throw new ValidationError("Blog not found", 404, false);
  }
}

async function getBlogbyAuthorId(authorId) {
  try {
    const blogExists = await blogRepository.getBlogbyAuthorId(authorId);
    return blogExists;
  } catch {
    throw new ValidationError("Blog not found", 404, false);
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogbyId,
  getBlogbyAuthorId,
  editBlog,
  deleteBlog,
};
