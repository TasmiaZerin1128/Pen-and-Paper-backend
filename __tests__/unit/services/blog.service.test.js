const blogService = require('../../../services/blog.service');
const userService = require('../../../services/user.service');
const blogRepository = require('../../../repositories/blog.repository');
const { AppError } = require("../../../utils/errorHandler");
const { blogDB, blogWithAuthorDB, userDB } = require('../mockDB');
const BlogDTO = require("../../../DTOs/blog.dto");
const { setLimitAndOffset } = require("../../../utils/pagination");

jest.mock('../../../utils/pagination');
jest.mock('../../../DTOs/blog.dto');

describe('Testing Blog Service', () => {
    describe('Testing createBlog', () => {
        it('should return the created blog', async () => {
            const blog = {
                title: 'Hello there',
                description: 'New post',
            }
            const username = 'tasmia';
            const author = userDB[2];
            const expectedResult = {
                id: '800',
                title: 'Hello there',
                description: 'New post',
                createdAt: '2023-03-30T03:59:52.000Z',
                updatedAt: '2023-03-30T04:00:09.000Z'
            }

            jest
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(author);

            jest
                .spyOn(blogRepository, 'createBlog')
                .mockReturnValueOnce(expectedResult);
            
            const response = await blogService.createBlog(blog);

            expect(blogRepository.createBlog).toBeCalledTimes(1);
            expect(blogRepository.createBlog).toBeCalledWith(blog);
            // expect(userService.getUserByUsername).toBeCalledWith(username);
            expect(response).toBe(expectedResult);
        });
        it('should throw error if author does not exist', async () => {
            const blog = {
                title: 'Hello there',
                description: 'New post',
            }
            const expectedError = new AppError('Author does not exist');
            jest
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(null);

            await expect(blogService.createBlog(blog)).rejects.toThrow(expectedError);
        })
        it('should throw error if blogRepository fails', async () => {
            const blog = {
                title: 'Hello there',
                description: 'New post',
            }
            const expectedError = new Error('Something went wrong!');

            const username = 'tasmia';
            const author = userDB[2];

            jest
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(author);

            jest
                .spyOn(blogRepository, 'createBlog')
                .mockRejectedValueOnce(expectedError);
            
            await expect(blogService.createBlog(blog)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing get all blogs', () => {
        it('should return a blogs list', async () => {
            const pageSize = 4;
            const pageNumber = 1;
            const limit = pageSize;
            const offset = (pageNumber - 1)*pageSize;

            setLimitAndOffset.mockReturnValueOnce({limit, offset});

            jest
                .spyOn(blogRepository, 'getAllBlogs')
                .mockImplementation((limit, offset) => {
                    return blogDB.slice(offset, offset + limit);
                });  

                const allBlog = [];
                blogDB.forEach((element) => {
                    BlogDTO.mockImplementation((element) => { 
                        return element;
                })
                allBlog.push(element);
              });
            
            const response = await blogService.getAllBlogs(pageSize, pageNumber);

            expect(blogRepository.getAllBlogs).toBeCalledTimes(1);
            expect(blogRepository.getAllBlogs).toBeCalledWith(limit, offset);
            expect(response).toHaveLength(limit);
            expect(response).toEqual(blogDB.slice(offset, offset + limit));
        });
        it('should return a blogs list using default limit offset', async () => {
            const pageSize = 'g';
            const pageNumber = 'ks';
            const limit = 3;
            const offset = (1 - 1)*3;

            setLimitAndOffset.mockReturnValueOnce({limit, offset});

            jest
                .spyOn(blogRepository, 'getAllBlogs')
                .mockImplementation((limit, offset) => {
                    return blogDB.slice(offset, offset + limit);
                });  

                const allBlog = [];
                blogDB.forEach((element) => {
                    BlogDTO.mockImplementation((element) => { 
                        return element;
                })
                allBlog.push(element);
              });
            
            const response = await blogService.getAllBlogs(pageSize, pageNumber);

            expect(blogRepository.getAllBlogs).toBeCalledTimes(1);
            expect(blogRepository.getAllBlogs).toBeCalledWith(limit, offset);
            expect(response).toHaveLength(limit);
            expect(response).toEqual(blogDB.slice(offset, offset + limit));
        });
        it('should throw error if blogRepository fails', async () => {
            const pageSize = 4;
            const pageNumber = 1;
            const limit = pageSize;
            const offset = (pageNumber - 1)*pageSize;
            const expectedError = new Error('Something went wrong!');

            setLimitAndOffset.mockReturnValueOnce({limit, offset});
            
            jest   
                .spyOn(blogRepository, 'getAllBlogs')
                .mockRejectedValueOnce(expectedError);
            
            await expect(blogService.getAllBlogs(limit, offset)).rejects.toThrow(expectedError);
        })
    })

    describe('Testing get Blog by BlogId', () => {
        it('should return the blog if exists', async () => {
            const blogId = '300';
            const expectedBlog = blogWithAuthorDB[2];
            const expectedResult = blogDB[2];

            jest   
                .spyOn(blogRepository, 'getBlogById')
                .mockReturnValueOnce(expectedBlog);
            
            BlogDTO.mockImplementation((blog) => { 
                return expectedResult;
            })
            const response = await blogService.getBlogById(blogId);

            expect(blogRepository.getBlogById).toBeCalledTimes(1);
            expect(blogRepository.getBlogById).toBeCalledWith(blogId);
            expect(response).toBe(expectedResult);
        });
        it('should throw an error if blog not found', async () => {
            const blogId = '600';
            const expectedError = new AppError('Blog not found');

            jest   
                .spyOn(blogRepository, 'getBlogById')
                .mockReturnValueOnce(null);
            
            await expect(blogService.getBlogById(blogId)).rejects.toThrow(expectedError);
        })
        it('should throw error if blogRepository fails', async () => {
            const blogId = '300';
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(blogRepository, 'getBlogById')
                .mockRejectedValueOnce(expectedError);
            
            await expect(blogService.getBlogById(blogId)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing get blogs by authorId', () => {
        it('should return the blogs of the author', async () => {
            const authroId = '003';
            const expectedData = [blogDB[0], blogDB[3]];

            jest   
                .spyOn(blogRepository, 'getBlogByAuthorId')
                .mockReturnValueOnce(expectedData);

            const allBlog = [];
            expectedData.forEach((element) => {
                BlogDTO.mockImplementation((element) => { 
                    return element;
            })
            allBlog.push(element);
            });
            
            const response = await blogService.getBlogsByAuthorId(authroId);

            expect(blogRepository.getBlogByAuthorId).toBeCalledTimes(1);
            expect(blogRepository.getBlogByAuthorId).toBeCalledWith(authroId);
            expect(response).toEqual(expectedData);
        });
        it('should throw an error if author has no blog', async () => {
            const authroId = '003';
            const expectedError = new AppError('The author has no blogs');

            jest   
                .spyOn(blogRepository, 'getBlogByAuthorId')
                .mockReturnValueOnce(null);
            
            await expect(blogService.getBlogsByAuthorId(authroId)).rejects.toThrow(expectedError);
        })
        it('should throw error if blogRepository fails', async () => {
            const authroId = '003';
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(blogRepository, 'getBlogByAuthorId')
                .mockRejectedValueOnce(expectedError);
            
            await expect(blogService.getBlogsByAuthorId(authroId)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing edit blog by blogId', () => {
        it('should edit the blog and return success', async () => {
            const blogId = '300';
            const blogItemsToEdit = { title : 'New blog' };
        
        jest
            .spyOn(blogRepository, 'editBlogByBlogId')
            .mockReturnValueOnce([1]);

        const response = await blogService.editBlogByBlogId(blogId, blogItemsToEdit);
        expect(blogRepository.editBlogByBlogId).toBeCalledTimes(1);
        expect(blogRepository.editBlogByBlogId).toHaveBeenCalledWith(blogId, blogItemsToEdit);
        expect(response).toEqual([1]);

        });
        it('should throw an error if blog not found', async () => {
            const blogId = '900';
            const blogItemsToEdit = { title : 'New blog' };

            const expectedError = new AppError('Blog not found');

            jest
            .spyOn(blogRepository, 'editBlogByBlogId')
            .mockReturnValueOnce(null);

            await expect(blogService.editBlogByBlogId(blogId, blogItemsToEdit)).rejects.toThrow(expectedError);
        });
        it('should throw error if blogRepository fails', async () => {
            const blogId = '200';
            const blogItemsToEdit = { title : 'New blog' };
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(blogRepository, 'editBlogByBlogId')
                .mockRejectedValueOnce(expectedError);
            
            await expect(blogService.editBlogByBlogId(blogId, blogItemsToEdit)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing delete blog', () => {
        it('should delete the blog and return success', async () => {
            const blogId = '200';

            jest   
                .spyOn(blogRepository, 'deleteBlogByBlogId')
                .mockReturnValueOnce(true);

            const response = await blogService.deleteBlogByBlogId(blogId);

            expect(blogRepository.deleteBlogByBlogId).toBeCalledTimes(1);
            expect(blogRepository.deleteBlogByBlogId).toBeCalledWith(blogId);
            expect(response).toEqual(true);
        });
        it('should throw error if blogRepository fails', async () => {
            const blogId = '200';
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(blogRepository, 'deleteBlogByBlogId')
                .mockRejectedValueOnce(expectedError);
            
            await expect(blogService.deleteBlogByBlogId(blogId)).rejects.toThrow(expectedError);
        });
        it('should throw error if no blog is found', async () => {
            const blogId = '200';
            const expectedError = new AppError('Blog not found');

            jest   
                .spyOn(blogRepository, 'deleteBlogByBlogId')
                .mockReturnValueOnce(false);
            
            await expect(blogService.deleteBlogByBlogId(blogId)).rejects.toThrow(expectedError);
        });
    });
})