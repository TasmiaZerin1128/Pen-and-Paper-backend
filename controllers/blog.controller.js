const blogService = require("../services/blog.service");
const { sendResponse } = require("../utils/contentNegotiation");
const { AppError } = require("../utils/errorHandler");

("use strict");

exports.getAllBlogs = async (req, res, next) => {
  try {
    let pageSize = req.query.pagesize;
    let pageNumber = req.query.pagenumber;

    const blogs = await blogService.getAllBlogs(pageSize, pageNumber);
    sendResponse(req, res, 200, blogs.length ? blogs : "Blog list is empty");
  } catch (err) {
    next(err);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const {title, description } = req.body;
    if (!title || !description) {
      throw new AppError("Title and description are needed", 400, false);
    }
    const createdBlog = await blogService.createBlog(req.body, req.username);
    sendResponse(req, res, 201, createdBlog);
  } catch (err) {
    next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.blogId);
    sendResponse(req, res, 200, blog);
  } catch (err) {
    next(err);
  }
};

exports.getBlogsByAuthorId = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogsByAuthorId(req.params.authorId);
    sendResponse(req, res, 200, blog);
  } catch (err) {
    next(err);
  }
};

exports.editBlogByBlogId = async (req, res, next) => {
  try {
    const blogItemsToEdit = req.body;
    if (!blogItemsToEdit.title && !blogItemsToEdit.description) {
      throw new AppError("Title and description are missing", 400, false);
    }
    const editedBlog = await blogService.editBlogByBlogId(req.params.blogId, req.body);
    sendResponse(req, res, 200, "Blog edited successfully");
  } catch (err) {
    next(err);
  }
};

exports.deleteBlogByBlogId = async (req, res, next) => {
  try {
    const deleteBlog = await blogService.deleteBlogByBlogId(req.params.blogId);
    sendResponse(req, res, 200, "Blog deleted");
  } catch (err) {
    next(err);
  }
};
