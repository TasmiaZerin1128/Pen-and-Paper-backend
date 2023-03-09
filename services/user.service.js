const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/userValidation");
const hashPassword = require("../utils/hashPassword");
const crypto = require("crypto");
var validator = require("email-validator");


exports.createUser = async (user) => {

  const userValid = userUtils.userValidator(user.username, user.email, user.password);
  if(!userValid.valid){
    return {status:400, message: userValid.message};
  }

  const userDuplicate = userUtils.userDuplicate(user.username, user.email);
  if((await userDuplicate).duplicate){
    return {status:422, message: (await userDuplicate).message};
  }

  try{
    const id = crypto.randomUUID();
    const hashedPassword = await hashPassword(user.password);

    const data = await userRepository.createUser(id, user.username.toLowerCase(), user.email, hashedPassword);
    return {status:201, message:'User created successfully'};
  }
  catch{
    return {status:400, message:'Please check your credentials again'};
  }
};

exports.getAllUsers = async () => {
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

exports.updateUser = async (username, userToUpdate) => {

  if(!userUtils.checkPasswordValid(userToUpdate)){
    return {status:400, message:'Password must contain atleast 6 characters'};
  }
  
  try{
    const hashedPassword = await hashPassword(user.password);
    const result = await userRepository.updateUser(username.toLowerCase(), hashedPassword);
    console.log(result);
    if(result.affectedRows == 0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User updated'};
  }
  catch{
    return {status:400, message:'User update failed'};
  }
}

exports.deleteUser = async (username) =>{
  try{
    const result = await userRepository.deleteUser(username.toLowerCase());
    if(result.affectedRows == 0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User removed'};
  }
  catch{
    return {status:404, message:'User not found'};
  }
}

exports.getUser = async (username) => {

  try{
    const result = await userRepository.getUserbyUsername(username.toLowerCase());
    console.log(result.length);
    if(result.length==0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:result};
  }
  catch{
    return {status:404, message:'User not found'};
  }
}