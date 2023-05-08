const userService = require("../services/user.service");
const {sendResponse} = require("../utils/contentNegotiation");


'use strict';

exports.getAllUsers = async (req, res, next) => {
  try {
    let pageSize = req.query.pagesize;   //how many items in one page
    let pageNumber = req.query.pagenumber;    //which page to go
    const data = await userService.getAllUsers(pageSize, pageNumber);
    return sendResponse(req, res, 200, data);
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const data = await userService.getUserDTOByUsername(req.params.username);
    return sendResponse(req, res, 200, data);
  } catch (err) {
    next(err);
  }
};

exports.updateUserByUsername = async (req, res, next) => {
  try {
    const data = await userService.updateUser(req.params.username, req.body);
    return sendResponse(req, res, 200, 'User updated');
  } catch (err) {
    next(err);
  }
};

exports.deleteUserByUsername = async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.username);
    return sendResponse(req, res, 200, 'User deleted');
  } catch (err) {
    next(err);
  }
};
