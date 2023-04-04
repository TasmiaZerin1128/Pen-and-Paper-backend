const blogController = require('../../../controllers/blog.controller');
const blogService = require('../../../services/blog.service');
const { sendResponse } = require('../../../utils/contentNegotiation');
const { blogDB } = require('../mockDB');

jest.mock('../../../utils/contentNegotiation');

describe('Testing blogController module', () => {
    describe('Testing get all blogs', () => {
        it('should return all blogs in response', async () => {
            
            const req = {
                query: {
                    pageSize: 3,
                    pageNumber: 1
                }
            }

            const pageSize = req.query.pageSize;
            const pageNumber = req.query.pageNumber;

            const res = {};
            const next = jest.fn();

            jest
                .spyOn(blogService, 'getAllBlogs')
                .mockReturnValueOnce(blogDB);

            sendResponse.mockReturnValueOnce(blogDB);

            response = await blogController.getAllBlogs(req, res, next);

            console.log(req.query);
            expect(blogService.getAllBlogs).toBeCalledTimes(1);
            // expect(blogService.getAllBlogs).toHaveBeenCalledWith(pageSize, pageNumber);
            expect(response).toBe(blogDB);
            
        });

        it('should throw an error if blogService call fails', async () => {

            const req = {
                query: {
                    pageSize: 3,
                    pageNumber: 1
                }
            };

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(blogService, 'getAllBlogs')
                .mockRejectedValueOnce(expectedError);

            await blogController.getAllBlogs(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
    });

    describe('Testing create blog', () => {
        it('should create the blog and return the body', async () => {
            const req = {
                username: 'tasmia',
                body: {
                    title: 'new blog',
                    description: 'this is a new blog'
                }
            }

            const newBlog = {
                id: '100',
                title: 'new blog',
                description: 'this is a new blog',
                createdAt: '2023-03-30T04:45:00.000Z',
                updatedAt: '2023-03-30T04:45:00.000Z',
                authorId: '003',
                authorFullName: 'Tasmia Zerin',
                authorUsername: 'tasmia',
                authorEmail: 'tasmia@gmail.com'
            }

            const res = {};
            const next = jest.fn();
            const expectedResponse = { data : newBlog };

            jest
                .spyOn(blogService, 'createBlog')
                .mockReturnValueOnce(newBlog);

            sendResponse.mockReturnValueOnce(expectedResponse);

            response = await blogController.createBlog(req, res, next);

            expect(blogService.createBlog).toBeCalledTimes(1);
            expect(response).toBe(expectedResponse);
            expect(blogService.createBlog).toHaveBeenCalledWith(req.body, req.username);
        });
        it('should throw an error if blogService call fails', async () => {

            const req = {
                username: 'tasmia',
                body: {
                    title: 'new blog',
                    description: 'this is a new blog'
                }
            }

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(blogService, 'createBlog')
                .mockRejectedValueOnce(expectedError);

            await blogController.createBlog(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });

        it('should throw an error if title or description are missing', async () => {
            const req = {
                body: { },
                params: {
                    blogId: '100'
                }
            }
            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Title and description are needed');

            await blogController.createBlog(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        })
        
    });

    describe('Testing get Blog by BlogId', () => {
        it('should return the blog if exists', async () => {
            const req = {
                params: {
                    blogId: '100'
                }
            }
            const res = {};
            const next = jest.fn();
            const expectedBlog = blogDB[0];

            jest
                .spyOn(blogService, 'getBlogById')
                .mockReturnValueOnce(expectedBlog);

            sendResponse.mockReturnValueOnce(expectedBlog);

            response = await blogController.getBlogById(req, res, next);

            expect(blogService.getBlogById).toBeCalledTimes(1);
            expect(response).toBe(expectedBlog);
            expect(blogService.getBlogById).toHaveBeenCalledWith(req.params.blogId);
        });
        it('should throw an error if blogService call fails', async () => {

            const req = {
                params: {
                    blogId: '100'
                }
            }

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(blogService, 'getBlogById')
                .mockRejectedValueOnce(expectedError);

            await blogController.getBlogById(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
        
    });

    describe('Testing get Blogs by AuthorId', () => {
        it('should return blogs for the author', async () => {
            const req = {
                params: {
                    authorId: '003'
                }
            }
            const res = {};
            const next = jest.fn();
            const expectedBlog = [blogDB[0], blogDB[3]];

            jest
                .spyOn(blogService, 'getBlogsByAuthorId')
                .mockReturnValueOnce(expectedBlog);

            sendResponse.mockReturnValueOnce(expectedBlog);

            response = await blogController.getBlogsByAuthorId(req, res, next);

            expect(blogService.getBlogsByAuthorId).toBeCalledTimes(1);
            expect(response).toBe(expectedBlog);
            expect(blogService.getBlogsByAuthorId).toHaveBeenCalledWith(req.params.authorId);
        });
        it('should throw an error if blogService call fails', async () => {

            const req = {
                params: {
                    authorId: '003'
                }
            }

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(blogService, 'getBlogsByAuthorId')
                .mockRejectedValueOnce(expectedError);

            await blogController.getBlogsByAuthorId(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
        
    });

    describe('Testing edit Blog by BlogId', () => {
        it('should update the blog if exists and return success', async () => {
            const req = {
                body: {
                    title: 'new blog',
                    description: 'this is a new blog'
                },
                params: {
                    blogId: '100'
                }
            }
            const res = {};
            const next = jest.fn();
            const expectedResponse = { data : 'Blog edited successfully' };

            jest
                .spyOn(blogService, 'editBlogByBlogId')
                .mockReturnValueOnce(expectedResponse);

            sendResponse.mockReturnValueOnce(expectedResponse);

            response = await blogController.editBlogByBlogId(req, res, next);

            expect(blogService.editBlogByBlogId).toBeCalledTimes(1);
            expect(response).toBe(expectedResponse);
            expect(blogService.editBlogByBlogId).toHaveBeenCalledWith(req.params.blogId, req.body);
        });
        it('should throw an error if blogService call fails', async () => {

            const req = {
                body: {
                    title: 'new blog',
                    description: 'this is a new blog'
                },
                params: {
                    blogId: '100'
                }
            }

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(blogService, 'editBlogByBlogId')
                .mockRejectedValueOnce(expectedError);

            await blogController.editBlogByBlogId(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });

        it('should throw an error if title and description are missing', async () => {
            const req = {
                body: { },
                params: {
                    blogId: '100'
                }
            }

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Title and description are missing');

            await blogController.editBlogByBlogId(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        })
        
    });

    describe('Testing delete Blog by BlogId', () => {
        it('should delete the blog if exists and return success', async () => {
            const req = {
                params: {
                    blogId: '100'
                }
            }
            const res = {};
            const next = jest.fn();
            const expectedResponse = { data : 'Blog deleted' };

            jest
                .spyOn(blogService, 'deleteBlogByBlogId')
                .mockReturnValueOnce(expectedResponse);

            sendResponse.mockReturnValueOnce(expectedResponse);

            response = await blogController.deleteBlogByBlogId(req, res, next);

            expect(blogService.deleteBlogByBlogId).toBeCalledTimes(1);
            expect(response).toBe(expectedResponse);
            expect(blogService.deleteBlogByBlogId).toHaveBeenCalledWith(req.params.blogId);
        });
        it('should throw an error if blogService call fails', async () => {

            const req = {
                params: {
                    blogId: '100'
                }
            }
            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(blogService, 'deleteBlogByBlogId')
                .mockRejectedValueOnce(expectedError);

            await blogController.deleteBlogByBlogId(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
        
    })
})