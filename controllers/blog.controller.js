const blogService = require("../services/blog.service");
const { sendResponse } = require("../utils/contentNegotiation");

"use strict";

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
}

exports.editBlogByBlogId = async (req, res, next) => {
    try {
    const editedBlog = await blogService.editBlogByBlogId(req.params.blogId, req.body);
    if(editedBlog[0] == 1){
        sendResponse(req, res, 200, 'Blog edited successfully');
    }
    else {
        res.status(404).json('Blog not found');
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteBlogByBlogId = async (req, res, next) => {
    try{
    const deleteBlog = await blogService.deleteBlogByBlogId(req.params.blogId);
    if(deleteBlog){
        sendResponse(req, res, 200, 'Blog deleted');
    }
    else {
        res.status(404).json('Blog not found');
    }
  } catch (err) {
    next(err);
  }
};
