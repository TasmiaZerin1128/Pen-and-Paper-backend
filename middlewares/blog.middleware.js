const blogService = require('../services/blog.service');
const userService = require('../services/user.service');

('use strict');

exports.blogMiddleware = async (req, res, next) => {
    try {
        const blogExists = await blogService.getBlogById(req.params.blogId);
        const authorExists = await userService.getUserByUsername(req.username);
        if (!blogExists) {
            return res.status(404).send('Blog not found');
        }
        if (!authorExists) {
            return res.status(404).send('Author not found');
        }
        if (blogExists.authorId !== authorExists.id) {
            return res.status(403).send('Permission denied');
        }
        next();
    } catch (err) {
        next(err);
    }
    return false;
};
