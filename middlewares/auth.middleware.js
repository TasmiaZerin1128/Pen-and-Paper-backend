"use strict";

const jwt = require("jsonwebtoken");

exports.authenticate = async (req, res, next) => {
  try {
    let accessToken = req.cookies.jwt;

    if (!accessToken) {
      return res.status(403).send("Cannot access this route");
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if(err) {
           return res.status(400).send('Session expired')
      }
      req.username = decoded.username;
      next();
      });

  } catch (err) {
    return res.status(401).send("Unauthorized User");
  }
};

exports.authorize = async(req, res, next) => {
  const tokenUsername = req.username;
  if(tokenUsername != req.params.username){
    return res.status(403).send("Permission denied");
  }
  next();
}
