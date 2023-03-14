'use strict'
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    let accessToken = req.cookies.jwt;

    if(!accessToken){
        return res.status(403).send("Cannot access this route");
    }

    try {
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).send("Invalid JWT token");
    }
}

module.exports = authMiddleware;