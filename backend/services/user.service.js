const userRepository = require("../repositories/user.repository");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  if (user.password.length < 6) {
    console.log("Password must be of atleast 6 characters");
  }

  const id = uuidv4();

  if(checkUsernameValid(user.username)){
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
  }
  else{

    return {status:401, message:'Space not allowed in username!'};
  }
};

function checkUsernameValid(username){
    if(/\s/.test(username)){
        return false;
    }
    return true;
}
