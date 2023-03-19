const authService = require("../services/auth.service");
const { sendToken, removeToken } = require("../utils/jwtToken");
require("dotenv").config();


"use strict"

exports.register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    if (data) {
      sendToken(data, 201, res);
    } 
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
};


exports.login = async (req, res) => {

    try{
        const data = await authService.login(req.body);
        if (data) {
          sendToken(data, 200, res);
        } 
    } catch (err) {
        res.status(err.statusCode).send(err.message);
    }
}

exports.logout = async (req, res) => {
  try{
    removeToken(res);
  } catch (err) {
    res.status(404).send("No user was logged in");
  }
}