"use strict";
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

  try {
    let accessToken = req.cookies.jwt;

    if (!accessToken) {
      return res.status(403).send("Cannot access this route");
    }
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.body.username = decode.username;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized User");
  }
};

module.exports = authMiddleware;
