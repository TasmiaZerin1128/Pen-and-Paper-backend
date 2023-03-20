const userService = require("../services/user.service");
const {sendResponse} = require("../utils/contentNegotiation");
const AppError = require("../utils/errorHandler");

'use strict';

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await userService.getAllUsers();
    res.status(200).send(data.length ? data : 'User table is empty');
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const data = await userService.getUserByUsername(req.params.username, true);
    if (data) {
      // res.status(200).send(data);
      sendResponse(req, res, 200, data);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUserByUsername = async (req, res, next) => {
  try {
    const data = await userService.updateUser(req.params.username, req.body);
    if(data[0] == 1){
      // res.status(200).send('User updated');
      sendResponse(req, res, 200, 'User updated');
    } else {
      res.status(400).send('User could not be updated');
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUserByUsername = async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.username);
    if(deletedUser){
      res.status(200).send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    next(err);
  }
};
