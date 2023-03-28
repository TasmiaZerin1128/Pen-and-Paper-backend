const validator = require("email-validator");

function userValidator(user){

    if(!user.username || !user.email || !user.password ){
        return {valid:false, message:'Please enter all the fields'};
    }

    if(!checkPasswordValid(user.password)){
        return {valid:false, message:'Password must contain atleast 6 characters'};
    }

    return {valid:true, message:'Credentials are valid'};

}

function checkPasswordValid(password){
    if(!password)
        return false;
    if(password.length < 6)
        return false;
    return true;
}

module.exports = { userValidator, checkPasswordValid };