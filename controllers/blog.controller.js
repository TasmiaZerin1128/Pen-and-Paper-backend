const blogService = require("../services/blog.service");
const { sendResponse } = require("../utils/contentNegotiation");

exports.getAllBlogs = async (req, res, next) => {
  try {
    let pageSize = req.query.pageSize;
    let pageNumber = req.query.pageNumber;

    const blogs = await blogService.getAllBlogs(pageSize, pageNumber);
    sendResponse(req, res, 200, blogs.length ? blogs : "Blog list is empty");
  } catch (err) {
    next(err);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const createdBlog = await blogService.createBlog(req.body, req.username);
    sendResponse(req, res, 201, createdBlog);
  } catch (err) {
    next(err);
  }
};

exports.getBlogbyId = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogbyId(req.params.blogId);
    sendResponse(req, res, 200, blog);
  } catch (err) {
    next(err);
  }
};

exports.editBlog = async (req, res, next) => {
  try {
    const editedBlog = await blogService.editBlog(req.params.blogId, req.body);
    if (editedBlog[0] == 1) {
      sendResponse(req, res, 200, "Blog edited successfully");
    } else {
      res.status(404).json("Blog not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const deleteBlog = await blogService.deleteBlog(req.params.blogId);
    if (deleteBlog) {
      sendResponse(req, res, 200, "Blog deleted");
    } else {
      res.status(404).json("Blog not found");
    }
  } catch (err) {
    next(err);
  }
};
