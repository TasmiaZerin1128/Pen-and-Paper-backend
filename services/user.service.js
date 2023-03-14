const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/userValidation");
const hashPassword = require("../utils/hashPassword");
const ValidationError = require("../utils/errorHandler");

'use strict';

// async function createUser(user){

//   const userValid = userUtils.userValidator(user.username, user.email, user.password);
//   if(!userValid.valid){
//     return {status:400, message: userValid.message};
//   }

//   try{
//     const id = crypto.randomUUID();
//     const hashedPassword = await hashPassword(user.password);

//     const data = await userRepository.createUser(id, user.fullName, user.username.toLowerCase(), user.email, hashedPassword);
//     return {status:201, message:'User created successfully'};
//   }
//   catch{
//     return {status:400, message:'Please check your credentials again'};
//   }
// };

async function getAllUsers() {
  try{
    const data =  await userRepository.getAllUsers();
    if(data.length==0){
      return {status:200, message:'Users table is empty!'};
    }
    return {status:200, message: data};
  }
  catch{
    return {status:200, message:'Users table is empty!'};
  }
}

async function updateUser(username, updatedUser) {

  if(!userUtils.checkPasswordValid(updatedUser.password)){
    throw new ValidationError('Password must contain atleast 6 characters', 400);
  }
  
  try{
    const hashedPassword = await hashPassword(updatedUser.password);
    const result = await userRepository.updateUser(username.toLowerCase(), hashedPassword);
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
    if(!result){
      throw new ValidationError('User not found', 404);
    }
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

module.exports = { getAllUsers, getUserbyUsername, getUserbyEmail, updateUser, deleteUser };