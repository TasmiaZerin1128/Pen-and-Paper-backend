const userRepository = require("../repositories/user.repository");
var validator = require("email-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  if (user.password.length < 6) {
    console.log("Password must be of atleast 6 characters");
  }

  const id = uuidv4();

  var credentialsValid = true;

  if(!checkUsernameValid(user.username)){
    return {status:401, message:'Space not allowed in username!'};
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
    await userRepository.createUser(id, username, user.email, hashedPassword);
    return {status:200, message:'User created successfully'};
  }
  catch{
    return {status:401, message:'Please check your credentials again'};
  }
};

function checkUsernameValid(username){
    if(/\s/.test(username)){
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