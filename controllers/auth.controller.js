const authService = require("../services/auth.service");
const { sendToken, removeToken } = require("../utils/jwtToken");
const {sendResponse} = require("../utils/contentNegotiation");
require("dotenv").config();


"use strict"

exports.register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    if (data) {
      sendToken(req, data, 201, res);
    } 
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {

    try{
        const data = await authService.login(req.body);
        if (data) {
          sendToken(req, data, 200, res);
        } 
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