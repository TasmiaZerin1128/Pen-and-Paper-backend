const blogRepository = require("../repositories/blog.repository");
const { AppError } = require("../utils/errorHandler");
const userService = require("../services/user.service");
const { setLimitAndOffset } = require("../utils/pagination");
const BlogDTO = require('../DTOs/blog.dto');

("use strict");

async function createBlog(blog, username) {
    const authorExists = await userService.getUserByUsername(username);
    if(!authorExists){
      throw new AppError("Author does not exist", 404, false);
    } 
    blog.authorId = authorExists.id;
    const result = await blogRepository.createBlog(blog);
    return result;
}

async function getAllBlogs(pageSize, pageNumber) {
    const { limit , offset } = setLimitAndOffset(pageSize, pageNumber);
    const data = await blogRepository.getAllBlogs(limit, offset);
    const allBlog = { count: data.count, rows: [] };
    data.rows.forEach((element) => {
      allBlog.rows.push( new BlogDTO(element));
    });
    return allBlog;
}

async function editBlogByBlogId(blogId, blogItemsToEdit) {
    const result = await blogRepository.editBlogByBlogId(blogId, blogItemsToEdit);
    if(!result) throw new AppError("Blog not found", 404, false);
    return new BlogDTO(result);
}

async function deleteBlogByBlogId(blogId) {
    const result = await blogRepository.deleteBlogByBlogId(blogId);
    if(!result) throw new AppError("Blog not found", 404, false);
    return result;
}

async function getBlogById(blogId) {
    const result = await blogRepository.getBlogById(blogId);
    if(!result) throw new AppError("Blog not found", 404, false);
    return new BlogDTO(result);
}

async function getBlogsByAuthorId(authorId, pageSize, pageNumber) {
  const { limit , offset } = setLimitAndOffset(pageSize, pageNumber);
    const result = await blogRepository.getBlogByAuthorId(authorId, limit, offset);
    if(!result.rows) throw new AppError("The author has no blogs", 404, false);
    const allBlog = { count: result.count, rows: [] };
    result.rows.forEach((element) => {
      allBlog.rows.push( new BlogDTO(element));
    });
    return allBlog;
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  getBlogsByAuthorId,
  editBlogByBlogId,
  deleteBlogByBlogId,
};
