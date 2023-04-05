const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/userValidation");
const { AppError } = require("../utils/errorHandler");
const { setLimitAndOffset } = require("../utils/pagination");
const UserDTO = require("../DTOs/user.dto");

'use strict';

async function createUser(user){
    const result = await userRepository.createUser(user);
    return result;
};

async function getAllUsers(pageSize, pageNumber) {
    const { limit , offset } = setLimitAndOffset(pageSize, pageNumber);
    const data =  await userRepository.getAllUsers(limit, offset);
    const allUsers = [];
    data.forEach((element) => {
      allUsers.push(new UserDTO(element));
    });
    return allUsers;
}

async function updateUser(username, userToUpdate) {
  if(!userUtils.checkPasswordValid(userToUpdate.password)){
    throw new AppError('Password must contain atleast 6 characters', 400, false);
  }
  
    const userExists = await getUserByUsername(username);
    if(!userExists){
      throw new AppError('User does not exist', 404, true);
    } 
      const result = await userRepository.updateUser(username, userToUpdate.password);
      if(!result[0]) throw new AppError('User could not be updated', 400, true);
      return result;
}

async function deleteUser (username) {
    const result = await userRepository.deleteUser(username);
    if(!result) throw new AppError('User not found', 404, false);
    return result;
}

async function getUserByUsername(username){
    const result = await userRepository.getUserByUsername(username);
    return result;
}

async function getUserDTOByUsername(username){
      const result = await userRepository.getUserByUsername(username);
      if(!result) throw new AppError('User not found', 404, false);
      return new UserDTO(result);
  }

async function getUserByEmail(email){
    const duplicateEmail = await userRepository.getUserByEmail(email);
    return duplicateEmail;
}

module.exports = { getAllUsers, createUser, getUserByUsername, getUserByEmail, updateUser, deleteUser, getUserDTOByUsername };