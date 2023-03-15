const blogRepository = require("../repositories/blog.repository");
const ValidationError = require("../utils/errorHandler");

'use strict';

async function createBlog(blog){

  try {
    const result = await blogRepository.createBlog(blog);
    return result;
  } catch (err) {
    throw new Error(err.message, 500);
  }
};

async function getAllBlogs() {
  try{
    const data =  await blogRepository.getAllBlogs();
    return data;
  }
  catch{
    return new Error('Cannot find any Blogs table', 404);
  }
}

async function updateBlog(blogId, updatedTitle, updatedDescription) {

  try{
    const blogExists = await getBlogbyId(blogId);
    if(blogExists){
      const result = await blogRepository.updateBlog(blogId, updatedTitle, updatedDescription);
      return result;
    } else {
      throw new ValidationError('Blog not found', 404);
    }
    
  }
  catch{
    throw new ValidationError('Blog update failed', 400);
  }
}

async function deleteBlog(blogId) {
  try{
    const result = await blogRepository.deleteBlog(blogId);
    return result;
  }
  catch{
    throw new ValidationError('Blog not found', 404);
  }
}

async function getBlogbyId(blogId){

  try{
    const result = await blogRepository.getBlogbyId(blogId);
    return result;
  }
  catch{
    throw new ValidationError('Blog not found', 404);
  }
}

async function getBlogbyAuthorId(authorId){
  try{
    const blogExists = await blogRepository.getBlogbyAuthorId(authorId);
    return blogExists;
  }
  catch{
    throw new ValidationError('Blog not found', 404);
  }
}

module.exports = { getAllBlogs, createBlog, getBlogbyId, getBlogbyAuthorId, updateBlog, deleteBlog };