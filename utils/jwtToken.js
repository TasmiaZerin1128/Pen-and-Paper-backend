const jwt = require("jsonwebtoken");

// Create token

const sendToken = (user, statusCode, res) => {
    const accesstoken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });

    res.status(statusCode)
    .cookie('jwt', accesstoken, { httpOnly: true })
    .json({
        success: true,
        user,
    });
}

//Remove token

const removeToken = (res) => {
    res.status(200)
    .clearCookie('jwt')
    .json({
        success: true,
        message: "Logged Out"
    });
}


module.exports = { sendToken, removeToken };