const authService = require("../services/auth.service");
const { sendToken, removeToken } = require("../utils/jwtToken");
const { AppError } = require("../utils/errorHandler");
const userUtils = require("../utils/userValidation");

"use strict";

exports.register = async (req, res, next) => {
  try {
    const user = req.body;
    const userValid = userUtils.userValidator(user);
    if (!userValid.valid) {
      throw new AppError(userValid.message, 400, false);
    }
    const newUser = await authService.register(req.body);
    sendToken(req, newUser, 201, res);
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
    try{
      const { username, password } = req.body;
      if (!username || !password) {
        throw new AppError("All fields are required!", 400, false);
      }  
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