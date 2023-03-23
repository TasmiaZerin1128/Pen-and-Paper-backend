/* eslint-disable no-param-reassign */
const blogRepository = require('../repositories/blog.repository');
const AppError = require('../utils/errorHandler');
const userService = require('./user.service');
const { setLimitAndOffset } = require('../utils/pagination');

('use strict');

async function createBlog(blog, username) {
    if (!blog.title || !blog.description) {
        throw new AppError('Title and description are needed', 400, false);
    }

    try {
        const authorExists = await userService.getUserByUsername(username);
        if (authorExists) {
            blog.authorId = authorExists.id;
            const result = await blogRepository.createBlog(blog);
            return result;
        }
        throw new AppError('Author does not exist', 404, false);
    } catch (err) {
        throw new AppError(err.message, err.statusCode, err.isOperational);
    }
}

async function getAllBlogs(pageSize, pageNumber) {
    try {
        const { limit, offset } = setLimitAndOffset(pageSize, pageNumber);
        const data = await blogRepository.getAllBlogs(limit, offset);
        return data;
    } catch {
        throw new AppError('Cannot find any Blogs table', 404, false);
    }
}

async function editBlog(blogId, blogItemsToEdit) {
    try {
        if (!blogItemsToEdit.title && !blogItemsToEdit.description) {
            throw new AppError('Title and description are missing', 400, false);
        }
        const result = await blogRepository.editBlog(blogId, blogItemsToEdit);
        return result;
    } catch (err) {
        throw new AppError(err.message, err.statusCode, err.isOperational);
    }
}

async function deleteBlog(blogId) {
    try {
        const result = await blogRepository.deleteBlog(blogId);
        return result;
    } catch (err) {
        throw new AppError('Blog delete failed', 500, true);
    }
}

async function getBlogbyId(blogId) {
    try {
        const result = await blogRepository.getBlogbyId(blogId);
        return result;
    } catch {
        throw new AppError('Blog not found', 404, false);
    }
}

async function getBlogbyAuthorId(authorId) {
    try {
        const blogExists = await blogRepository.getBlogbyAuthorId(authorId);
        return blogExists;
    } catch {
        throw new AppError('Blog not found', 404, false);
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
