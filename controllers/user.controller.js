const userService = require("../services/user.service");
const {sendResponse} = require("../utils/contentNegotiation");
const AppError = require("../utils/errorHandler");

'use strict';

exports.getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    res.status(200).send(data.length ? data : 'User table is empty');
  } catch (err) {
    throw err;
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const data = await userService.getUserByUsername(req.params.username, true);
    if (data) {
      // res.status(200).send(data);
      sendResponse(req, res, 200, data);
    }
    else {
      sendResponse(req, res, 404, data);
    }
      // res.status(404).send("User not found");
  } catch (err) {
    // res.status(err.statusCode).send(err.message);
    throw err;
  }
};

exports.updateUserByUsername = async (req, res) => {
  try {
    const data = await userService.updateUser(req.params.username, req.body);
    res.status(200).send('User updated');
  } catch (err) {
    next(err);
  }
};

exports.deleteUserByUsername = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.username);
    if(deletedUser){
      res.status(200).send('User deleted');
    } 
      res.status(404).send('User not found');
  } catch (err) {
    next(err);
  }
};
