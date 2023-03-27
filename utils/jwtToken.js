const jwt = require('jsonwebtoken');
const { sendResponse } = require('./contentNegotiation');

// Create token

const sendToken = (req, user, statusCode, res) => {
    const accesstoken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: process.env.JWT_ALGO,
        expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE, 10),
    });

    res.cookie('jwt', accesstoken, { httpOnly: true });

    sendResponse(req, res, statusCode, {
        success: true,
        user,
    });
};

// Remove token

const removeToken = (req, res) => {
    res.clearCookie('jwt');
    sendResponse(req, res, 200, {
        success: true,
        message: 'Logged Out',
    });
};

module.exports = { sendToken, removeToken };
