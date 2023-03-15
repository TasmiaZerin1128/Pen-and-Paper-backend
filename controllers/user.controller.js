const userService = require("../services/user.service");

("use strict");

exports.getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    if(data){
      res.status(200).send(data);
    } 
    else {
      res.status(200).send('User table is empty');
    }
    
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
};

exports.getUserbyUsername = async (req, res) => {
  try {
    const data = await userService.getUserbyUsername(req.params.username);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
};

exports.updateUserbyUsername = async (req, res) => {
  try {
    const data = await userService.updateUser(req.params.username, req.body);
    res.status(data.status).send(data.message);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
};

exports.deleteUserbyUsername = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.username);
    res.status(deletedUser.status).send(deletedUser.message);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
};
