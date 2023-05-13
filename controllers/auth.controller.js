const authService = require("../services/auth.service");
const { sendToken, removeToken } = require("../utils/jwtToken");
const { AppError } = require("../utils/errorHandler");
const userUtils = require("../utils/userValidation");
const { sendResponse } = require("../utils/contentNegotiation");

"use strict";

exports.register = async (req, res, next) => {
  try {
    const user = req.body;
    const userValid = userUtils.userValidator(user);
    if (!userValid.valid) {
      throw new AppError(userValid.message, 400, false);
    }
    const newUser = await authService.register(user);
    const accesstoken = sendToken(newUser);

    res.cookie('jwt', accesstoken, { sameSite: 'none', secure: true });

    return sendResponse(req, res, 201, {
      success: true,
      user: newUser,
      accesstoken
  });
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
        const accesstoken = sendToken(user, res);
        res.cookie('jwt', accesstoken, { sameSite: 'none', secure: true });

       return sendResponse(req, res, 200, {
          success: true,
          message: 'User logged in successfully',
          accesstoken
      });
        
    } catch (err) {
        next(err);
    }
}

exports.logout = async (req, res) => {
  try{
    removeToken(res);
    return sendResponse(req, res, 200, {
      success: true,
      message: "Logged Out"
  });
  } catch (err) {
    res.status(404).send("No user was logged in");
  }
}