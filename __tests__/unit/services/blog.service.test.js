const blogService = require('../../../services/blog.service');
const blogRepository = require('../../../repositories/blog.repository');
const { AppError } = require("../../../utils/errorHandler");
const { blogDB, blogWithAuthorDB } = require('../mockDB');
const BlogDTO = require("../../../DTOs/blog.dto");
const { setLimitAndOffset } = require("../../../utils/pagination");

jest.mock('../../../utils/pagination');
jest.mock('../../../DTOs/blog.dto');

describe('Testing Blog Service', () => {
    describe('Testing createBlog', () => {
        it('should return the created blog', async () => {
            const newUser = {
                fullName : 'New User',
                username : 'newUser',
                email : 'new@gmail.com',
                password : 'thisisnew',
            }

            const expectedResult = {
                id: '006',
                fullName : 'New User',
                username : 'newUser',
                email : 'new@gmail.com',
                password : 'herwroskpoksfofsfssfswd3',
                createdAt: '2023-03-29T03:12:53.000Z',
                updatedAt: '2023-03-29T07:31:37.000Z',
            }

            jest
                .spyOn(blogRepository, 'createUser')
                .mockReturnValueOnce(expectedResult);
            
            const response = await blogService.createUser(newUser);

            expect(blogRepository.createUser).toBeCalledTimes(1);
            expect(blogRepository.createUser).toBeCalledWith(newUser);
            expect(response).toBe(expectedResult);
        });
        it('should throw error if userRepository fails', async () => {
            const newUser = {
                fullName : 'New User',
                username : 'newUser',
                email : 'new@gmail.com',
                password : 'thisisnew',
            }
            const expectedError = new Error('Something went wrong!');

            jest
                .spyOn(blogRepository, 'createUser')
                .mockRejectedValueOnce(expectedError);
            
            await expect(blogService.createUser(newUser)).rejects.toThrow(expectedError);
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
            const blogId = '600';
            const blogItemsToEdit = { title : 'New blog' };
        
        jest
            .spyOn(blogRepository, 'editBlogByBlogId')
            .mockReturnValueOnce([1]);

        const response = await blogService.editBlogByBlogId(blogId, blogItemsToEdit);
        expect(blogRepository.editBlogByBlogId).toBeCalledTimes(1);
        expect(blogRepository.editBlogByBlogId).toHaveBeenCalledWith(blogId, blogItemsToEdit);
        expect(response).toEqual([1]);

        });
        it('should throw an error if user does not exist', async () => {
            const username = 'noUser';
            const userToUpdate = { password : '123' };

            const expectedError = new AppError('User does not exist');

            jest
                .spyOn(userUtils, 'checkPasswordValid')
                .mockReturnValueOnce(true);

            jest
                .spyOn(blogService, 'getUserByUsername')
                .mockReturnValueOnce(null);

            await expect(blogService.updateUser(username, userToUpdate)).rejects.toThrow(expectedError);
        });
        it('should throw an error if user update fails', async () => {
            const username = 'tasmia';
            const userToUpdate = { password : '123657547' };

            const expectedResult = {
                id: '003',
                fullName: 'Tasmia Zerin',
                username: 'tasmia',
                email: 'tasmia@gmail.com',
                password: '123456',
                createdAt: '2023-03-29T09:56:57.000Z',
                updatedAt: '2023-03-29T09:56:57.000Z',
            }

            const expectedError = new AppError('User could not be updated');

            jest
                .spyOn(userUtils, 'checkPasswordValid')
                .mockReturnValueOnce(true);

            jest
                .spyOn(blogService, 'getUserByUsername')
                .mockReturnValueOnce(expectedResult);
            
            jest
                .spyOn(blogRepository, 'updateUser')
                .mockReturnValueOnce([0]);

            await expect(blogService.updateUser(username, userToUpdate)).rejects.toThrow(expectedError);
        })
    });

    describe('Testing delete user', () => {
        it('should delete the user and return success', async () => {
            const username = 'tasmia';

            jest   
                .spyOn(blogRepository, 'deleteUser')
                .mockReturnValueOnce(true);

            const response = await blogService.deleteUser(username);

            expect(blogRepository.deleteUser).toBeCalledTimes(1);
            expect(blogRepository.deleteUser).toBeCalledWith(username);
            expect(response).toEqual(true);
        });
        it('should throw error if userRepository fails', async () => {
            const username = 'tasmia';
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(blogRepository, 'deleteUser')
                .mockRejectedValueOnce(expectedError);
            
            await expect(blogService.deleteUser(username)).rejects.toThrow(expectedError);
        });
        it('should throw error if no user is found', async () => {
            const username = 'noUser';
            const expectedError = new AppError('User not found');

            jest   
                .spyOn(blogRepository, 'deleteUser')
                .mockReturnValueOnce(false);
            
            await expect(blogService.getUserDTOByUsername(username)).rejects.toThrow(expectedError);
        });
    });
})