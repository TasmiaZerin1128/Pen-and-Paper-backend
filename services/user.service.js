const userRepository = require("../repositories/user.repository");
var validator = require("email-validator");
const bcrypt = require("bcrypt");


exports.createUser = async (user) => {
  if (user.password.length < 6) {
    console.log("Password must be of atleast 6 characters");
  }

  if(user.username==null || user.email == null || user.password==null){
    return {status:401, message:'Please enter all the fields'};
  }

  if(!checkUsernameValid(user.username)){
    return {status:401, message:'Username cannot contain space and special characters!'};
  }

  if(!checkPasswordValid(user.password)){
    return {status:401, message:'Password must contain atleast 6 characters'};
  }

  if(!checkEmailValid(user.email)){
    return {status:401, message:'Email is not valid'};
  }

  const username = user.username.toLowerCase();
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(user.password,salt);

  try{
    const data = await userRepository.createUser(username, user.email, hashedPassword);
    return {status:200, message:'User created successfully'};
  }
  catch{
    return {status:401, message:'Please check your credentials again'};
  }
};

exports.getAllUsers = async () => {
  try{
    const data =  await userRepository.getUsers();
    if(data.length==0){
      return {status:404, message:'Users table is empty!'};
    }
    return {status:200, message: data};
  }
  catch{
    return {status:404, message:'Users not found'};
  }
}

exports.updateUser = async (username, userToUpdate) => {

  if(!checkPasswordValid(userToUpdate.password)){
    return {status:401, message:'Password must contain atleast 6 characters'};
  }
  
  try{
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userToUpdate.password,salt);
    const result = await userRepository.updateUser(username.toLowerCase(), hashedPassword);
    console.log(result);
    if(result.affectedRows == 0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User updated'};

  }
  catch{
    return {status:404, message:'User update failed'};
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

exports.getOneUser = async (username) => {

  try{
    const result = await userRepository.getUser(username.toLowerCase());
    if(result.length==0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:result};
  }
  catch{
    return {status:404, message:'User not found'};
  }
}

function checkUsernameValid(username){
    if(/\s/.test(username)){
        return false;
    }
    const specialCharacterCheck = /[^A-Za-z0-9]/;
    if(specialCharacterCheck.test(username)){
      return false;
    }
    return true;
}

function checkPasswordValid(password){
    if(password.length < 6){
        return false;
    }
    return true;
}

function checkEmailValid(email){
    if(validator.validate(email)){
        return true;
    }
    else{
        return false;
    }
}