const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/userValidation");
const { hashPassword } = require("../utils/hashPassword");
const ValidationError = require("../utils/errorHandler");

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
    if(data.length==0){
      return {status:200, message:'Users table is empty!'};
    }
    return {status:200, message: data};
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
    const hashedPassword = await hashPassword(userToUpdate.password);
    const result = await userRepository.updateUser(username, hashedPassword);
    if(result == 0){
      throw new ValidationError('User not found', 404);
    }
    return {status:200, message:'User updated'};
  }
  catch{
    throw new ValidationError('User update failed', 400);
  }
}

async function deleteUser (username) {
  try{
    const result = await userRepository.deleteUser(username.toLowerCase());
    if(!result){
      throw new ValidationError('User not found', 404);
    }
    return {status:200, message:'User removed'};
  }
  catch{
    throw new ValidationError('User not found', 404);
  }
}

async function getUserbyUsername(username){

  try{
    const result = await userRepository.getUserbyUsername(username);
    return result;
  }
  catch{
    throw new ValidationError('User not found', 404);
  }
}

async function getUserbyEmail(email){
  try{
    const duplicateEmail = await userRepository.getUserbyEmail(email);
    if(!duplicateEmail){
      throw new ValidationError('User not found', 404);
    }
    return {status:200, message:duplicateEmail};
  }
  catch{
    throw new ValidationError('User not found', 404);
  }
}

module.exports = { getAllUsers, createUser, getUserbyUsername, getUserbyEmail, updateUser, deleteUser };