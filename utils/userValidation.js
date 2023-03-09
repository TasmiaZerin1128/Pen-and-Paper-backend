const validator = require("email-validator");
const userRepository = require("../repositories/user.repository");

function userValidator(username, email, password){

    if(!username || !email || !password ){
        return {valid:false, message:'Please enter all the fields'}; ;
    }

    if(!checkUsernameValid(username)){
        return {valid:false, message:'Username cannot contain space and special characters!'};
    }

    if(!checkEmailValid(email)){
        return {valid:false, message:'Please enter a valid email'};
    }

    if(!checkPasswordValid(password)){
        return {valid:false, message:'Password must contain atleast 6 characters'};
    }

    return {valid:true, message:'Credentials are valid'};

}

async function userDuplicate(username, email){
    const duplicateUsername = await userRepository.getUserbyUsername(username);
    if(duplicateUsername.length>0){
      return {duplicate:true, message:'Username already exists!'};
    }

    const duplicateEmail = await userRepository.getUserbyEmail(email);
    if(duplicateEmail.length>0){
      return {duplicate:true, message:'Email already exists!'};
    }

    return {duplicate:false, message:'Username and email are unique'};
}

function checkUsernameValid(username){

    const usernameValidCheck = /[^A-Za-z0-9]/;
    if(usernameValidCheck.test(username)){
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


module.exports = { userValidator, userDuplicate, checkUsernameValid, checkPasswordValid, checkEmailValid };