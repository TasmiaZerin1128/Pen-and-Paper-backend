const userDTO = require('../DTOs/user.dto');
const User = require('../models/user.model');

exports.createUser = async (id, username, email, password) => {

  const result = await User.create({id: id, username: username, email: email, password: password});
  console.log("User created successfully");
  return result;
};

exports.getAllUsers = async () => {

  const result = await User.findAll();

  const allUsers = [];

  result.forEach(element => {
    allUsers.push(new userDTO(element));
  });

  return allUsers;
};

exports.getUserbyUsername = async (username) => {

  const result = await User.findOne({ where: {username: username } });
  const userdto = new userDTO(result);
  return userdto;
};

exports.updateUser = async (username, updatedPassword) => {

  const result = await User.update({password:updatedPassword},{where:{username:username}});
  console.log(result);
  return result;
};

exports.deleteUser = async (username) => {

  const result = User.destroy({where:{username:username}});
  return result;
};


exports.getUserbyEmail = async (email) => {

  const result = await User.findOne({ where: {email: email } });
  const userdto = new userDTO(result);
  return userdto;
};