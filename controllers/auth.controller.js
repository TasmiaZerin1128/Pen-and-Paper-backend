const authService = require("../services/auth.service");
const { sendToken, removeToken } = require("../utils/jwtToken");
require("dotenv").config();

"use strict";

exports.register = async (req, res, next) => {
  try {
    const newUser = await authService.register(req.body);
    sendToken(req, newUser, 201, res);
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
    try{
        const user = await authService.login(req.body);
        sendToken(req, user, 200, res);
    } catch (err) {
        next(err);
    }
}

exports.logout = async (req, res) => {
  try{
    removeToken(req, res);
  } catch (err) {
    res.status(404).send("No user was logged in");
  }
}