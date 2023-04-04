const jwt = require("jsonwebtoken");
// Create token

const sendToken = (user, res) => {
    const accesstoken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: process.env.JWT_ALGO,
        expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE)
    });

    return accesstoken;
}

//Remove token

const removeToken = (res) => {
    res.clearCookie('jwt');
}

module.exports = { sendToken, removeToken };