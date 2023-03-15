const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/userValidation");
const { hashPassword } = require("../utils/hashPassword");
const ValidationError = require("../utils/errorHandler");
const userDTO = require('../DTOs/user.dto');

'use strict';

async function createUser(user){

  try {
    const result = await userRepository.createUser(user);
    return result;
  } catch (err) {
    throw new ValidationError(err.message, 500);
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
    throw new ValidationError('Password must contain atleast 6 characters', 400);
  }
  
  try{
    const userExists = await getUserbyUsername(username, false);
    if(userExists){
      const hashedPassword = await hashPassword(userToUpdate.password);
      const result = await userRepository.updateUser(username, hashedPassword);
      return result;
    } else {
      throw new ValidationError('User not found', 404);
    }
    
  }
  catch{
    throw new ValidationError('User update failed', 400);
  }
}

async function deleteUser (username) {
  try{
    const result = await userRepository.deleteUser(username);
    return result;
  }
  catch{
    throw new ValidationError('User not found', 404);
  }
}

async function getUserbyUsername(username, returnUsingDTO){

  try{
    const result = await userRepository.getUserbyUsername(username);
    if(returnUsingDTO){
      const userFound = new userDTO(result);
      return userFound;
    } else {
      return result;
    }
  }
  catch{
    throw new ValidationError('User not found', 404);
  }
}

async function getUserbyEmail(email){
  try{
    const duplicateEmail = await userRepository.getUserbyEmail(email);
    return duplicateEmail;
  }
  catch{
    throw new ValidationError('User not found', 404);
  }
}

module.exports = { getAllUsers, createUser, getUserbyUsername, getUserbyEmail, updateUser, deleteUser };