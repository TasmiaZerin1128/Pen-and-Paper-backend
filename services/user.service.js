const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/userValidation");
const { hashPassword } = require("../utils/hashPassword");
const AppError = require("../utils/errorHandler");
const userDTO = require('../DTOs/user.dto');
const { setLimitAndOffset } = require("../utils/pagination");
const UserDTO = require("../DTOs/user.dto");

'use strict';

async function createUser(user){

  try {
    const result = await userRepository.createUser(user);
    return result;
  } catch (err) {
    throw new AppError(err.message, 500, true);
  }
};

async function getAllUsers(pageSize, pageNumber) {
  try{
    const { limit , offset } = setLimitAndOffset(pageSize, pageNumber);
    const data =  await userRepository.getAllUsers(limit, offset);
    return data;
  }
  catch{
    throw new AppError('Cannot find any Users table', 404, false);
  }
}

async function updateUser(username, userToUpdate) {
  if(!userUtils.checkPasswordValid(userToUpdate.password)){
    throw new AppError('Password must contain atleast 6 characters', 400, false);
  }
  
  try{
    const userExists = await getUserByUsername(username);
    if(userExists){
      const hashedPassword = await hashPassword(userToUpdate.password);
      const result = await userRepository.updateUser(username, hashedPassword);
      return result;
    } else {
      throw new AppError('User could not be updated', 400, true);
    }
  }
  catch (err) {
    throw new AppError(err.message, err.statusCode, err.isOperational);
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

async function getUserByUsername(username){

  try{
    const result = await userRepository.getUserByUsername(username);
    return result;
  }
  catch{
    throw new AppError('User not found', 404, false);
  }
}

async function getUserDTOByUsername(username){

    try{
      const result = await userRepository.getUserDTOByUsername(username);
      return new UserDTO(result);
    }
    catch{
      throw new AppError('User not found', 404, false);
    }
  }

async function getUserByEmail(email){
  try{
    const duplicateEmail = await userRepository.getUserByEmail(email);
    return duplicateEmail;
  }
  catch{
    throw new AppError('User not found', 404, false);
  }
}

module.exports = { getAllUsers, createUser, getUserByUsername, getUserByEmail, updateUser, deleteUser, getUserDTOByUsername };