const authRepository = require("../repositories/auth.repository");
const userUtils = require("../utils/userValidation");
const bcrypt = require("bcrypt");

exports.register = async (user) => {

  const userValid = userUtils.userValidator(
    user.username,
    user.email,
    user.password
  );
  if (!userValid.valid) {
    return { status: 400, message: userValid.message };
  }

  try {
    const result = await authRepository.register(user);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.login = async (user) => {

      try {
        const userExists = await authRepository.checkUserExists(user.username.toLowerCase());
        if(userExists){
            const validPass = await bcrypt.compare(user.password, userExists.password);
            if(!validPass){
                return false;
            } 
            return userExists;
        }
        else{
            return false;
        }
      } catch (err) {
        throw err;
      }
}
