const userService = require("../services/user.service");

'use strict';

exports.getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    if(data.length!=0){
      res.status(200).send(data);
    } 
    else {
      res.status(200).send('User table is empty');
    }
    
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const data = await userService.getUserByUsername(req.params.username, true);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    next(err);
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
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    next(err);
  }
};
