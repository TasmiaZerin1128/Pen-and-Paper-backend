const blogRepository = require('../../../repositories/blog.repository');
const Blog = require('../../../models/blog.model');
const { blogDB } = require('../mockDB');
const { SequelizeValidationError } = require("../../../utils/errorHandler");

class createNewBlog {
    constructor(newBlog) {
        this.id = '89b4bca8-c564-45ea-a1a6-8662d4bb2fe2',
        this.title = newBlog.title;
        this.description = newBlog.description;
        this.authorId = '0001';
        this.createdAt = '2023-03-30T03:35:31.000Z',
        this.updatedAt = '2023-03-30T03:35:31.000Z';
    }
}

describe('Testing Blog Repository', () => {
    describe('Testing get all Blogs', () => {
    it('should return array of all Blogs', async () => {
 
        const limit = 3;
        const offset = 1;
        jest
            .spyOn(Blog, 'findAll')
            .mockImplementation(({limit, offset}) => {
                return blogDB.slice(offset, offset + limit);
            });

        const response = await blogRepository.getAllBlogs(limit, offset);

        expect(Blog.findAll).toHaveBeenCalledWith(
            {include : ["author"], order: [
                ['updatedAt', 'DESC']], offset : offset, limit : limit }
        );
        expect(response).toHaveLength(limit);
        expect(response).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    description: expect.any(String),
                }),
            ])
        );
    }),

    it('should throw an error if database query fails', async () => {
        const limit = 3;
        const offset = 1;
        const error = new Error('Error in getting all Blogs');
        jest
            .spyOn(Blog, 'findAll')
            .mockRejectedValueOnce(error);

        await expect(blogRepository.getAllBlogs(limit, offset)).rejects.toThrow(error);
    })
});

    describe('Testing get Blog by BlogId', () => {
        it('should get a Blog by BlogId', async () => {
            const blogId = '100';
            const expectedData = blogDB[0];

            jest
                .spyOn(Blog, 'findOne').mockResolvedValueOnce(expectedData);
            
            const response = await blogRepository.getBlogById(blogId);

            expect(Blog.findOne).toBeCalledTimes(1);
            expect(Blog.findOne).toBeCalledWith(
                {include : ["author"], where: { id: blogId } }
            );
            expect(response).toEqual(expectedData);  
        });
        it('should return null when no Blog found', async () => {
            const blogId = '001';

            jest
                .spyOn(Blog, 'findOne').mockReturnValue(null);
            
                const response = await blogRepository.getBlogById(blogId);

            expect(Blog.findOne).toBeCalledTimes(1);
            expect(Blog.findOne).toBeCalledWith(
                {include : ["author"], where: { id: blogId } }
            );
            expect(response).toEqual(null);  
        })
    });

    describe('Testing get Blog by authorId', () => {
        it('should get a Blog by authorId', async () => {
            const authorId = '003';
            const expectedData = [blogDB[0], blogDB[3]];

            jest
                .spyOn(Blog, 'findAll').mockResolvedValueOnce(expectedData);
            
            const response = await blogRepository.getBlogByAuthorId(authorId);

            expect(Blog.findAll).toBeCalledTimes(1);
            expect(Blog.findAll).toBeCalledWith(
                {include : ["author"], where: { authorId: authorId } }
            );
            expect(response).toEqual(expectedData);  
        });
        it('should return null when no Blog or Author found', async () => {
            const authorId = '300';
            jest
                .spyOn(Blog, 'findAll').mockReturnValue(null);
            
            const response = await blogRepository.getBlogByAuthorId(authorId);

            expect(Blog.findAll).toBeCalledTimes(1);
            expect(Blog.findAll).toBeCalledWith(
                {include : ["author"], where: { authorId: authorId } }
            );
            expect(response).toEqual(null);  
        })
    });

    describe('Testing edit Blog by BlogId', () => {
        it('should edit a Blog and return 1', async () => {
            const blogId = '001';
            const editedBlog = { title : 'new blog', description : 'hey there this is new blog' };

            jest
                .spyOn(Blog, 'update').mockResolvedValue(1);

            const response = await blogRepository.editBlogByBlogId(blogId, editedBlog);

            expect(Blog.update).toBeCalledWith(
                { title: editedBlog.title, 
                  description: editedBlog.description },
                { where: { id: blogId } }
            );
            expect(response).toBe(1);
        });
        it('should return 0 if no Blog found', async () => {
            const blogId = '100';
            const editedBlog = { title : 'new blog', description : 'hey there this is new blog' };

            jest
                .spyOn(Blog, 'update').mockResolvedValue(0);

            const response = await blogRepository.editBlogByBlogId(blogId, editedBlog);

            expect(Blog.update).toBeCalledWith(
                { title: editedBlog.title, 
                  description: editedBlog.description },
                { where: { id: blogId } }
            );
            expect(response).toBe(0);
        })
    })

    describe('Testing delete a Blog', () => {
        it('should delete a Blog by BlogId', async () => {
            const blogId = '001';
            jest
                .spyOn(Blog, 'destroy')
                .mockResolvedValueOnce(1);

            const response = await blogRepository.deleteBlogByBlogId(blogId);

            expect(Blog.destroy).toHaveBeenCalledWith(
                 { where: { id: blogId } } 
            );
            expect(response).toBe(1);
        });
        it('should return 0 if Blog not found', async () => {
            const blogId = '001';
            jest
                .spyOn(Blog, 'destroy')
                .mockResolvedValueOnce(0);

            const response = await blogRepository.deleteBlogByBlogId(blogId);

            expect(Blog.destroy).toHaveBeenCalledWith(
                { where: { id: blogId } } 
            );
            expect(response).toBe(0);
        });
    });

    describe('Testing create a Blog', () => {
        it('should create a Blog and return it', async () => {
            const newBlog = { 
                title: 'new blog',
                description: 'newBlog',
            };

            const returnNewBlog = new createNewBlog(newBlog);
            jest
                .spyOn(Blog, 'create')
                .mockResolvedValue(returnNewBlog);
            
            const response = await blogRepository.createBlog(newBlog);
            console.log(response);

            expect(Blog.create).toBeCalledTimes(1);
            expect(Blog.create).toBeCalledWith(newBlog);
            expect(response).toBe(returnNewBlog);
        });
        it('should throw sequelize validation error', async () => {
            const expectedError = new Error('Any sequelize validation error');
            expectedError.errors = [{ message: 'sequelize validation error' }]

            const newBlog = { 
                title: ' ',
                description: ' ',
            };
            jest
                .spyOn(Blog, 'create')
                .mockRejectedValueOnce(expectedError);
               
            await expect(
                blogRepository.createBlog(newBlog)
            ).rejects.toThrow(new SequelizeValidationError(expectedError, 400));
        })
    })
});