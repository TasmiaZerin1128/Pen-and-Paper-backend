const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/userValidation");
const { hashPassword } = require("../utils/hashPassword");
const AppError = require("../utils/errorHandler");
const userDTO = require('../DTOs/user.dto');

'use strict';

async function createUser(user){

  try {
    const result = await userRepository.createUser(user);
    return result;
  } catch (err) {
    throw new Error(err.message, 500, true);
  }
};

async function getAllUsers() {
  try{
    const data =  await userRepository.getAllUsers();
    return data;
  }
  catch{
    return new Error('Cannot find any Users table', 404);
  }
}

async function updateUser(username, userToUpdate) {

  if(!userUtils.checkPasswordValid(userToUpdate.password)){
    throw new AppError('Password must contain atleast 6 characters', 400, false);
  }
  
  try{
    const userExists = await getUserByUsername(username, false);
    if(userExists){
      const hashedPassword = await hashPassword(userToUpdate.password);
      const result = await userRepository.updateUser(username, hashedPassword);
      return result;
    } else {
      throw new AppError('User not found', 404, false);
    }
    
  }
  catch{
    throw new AppError('User update failed', 400, false);
  }
}

async function deleteUser (username) {
  try{
    const result = await userRepository.deleteUser(username);
    return result;
  }
  catch{
    throw new AppError('User not found', 404, false);
  }
}

async function getUserByUsername(username, returnUsingDTO){

  try{
    const result = await userRepository.getUserByUsername(username);
    if(returnUsingDTO){
      const userFound = new userDTO(result);
      return userFound;
    } else {
      return result;
    }
  }
  catch{
    throw new AppError('User not found', 404, false);
  }
}

async function getUserbyEmail(email){
  try{
    const duplicateEmail = await userRepository.getUserbyEmail(email);
    return duplicateEmail;
  }
  catch{
    throw new AppError('User not found', 404, false);
  }
}

module.exports = { getAllUsers, createUser, getUserByUsername, getUserbyEmail, updateUser, deleteUser };