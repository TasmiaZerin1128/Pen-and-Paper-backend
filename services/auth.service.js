const userService = require("../services/user.service");
const userUtils = require("../utils/userValidation");
const { comparePassword } = require("../utils/hashPassword");
const userDTO = require("../DTOs/user.dto");
const ValidationError = require("../utils/errorHandler");

exports.register = async (user) => {
  const userValid = userUtils.userValidator(user);
  if (!userValid.valid) {
    throw new ValidationError(userValid.message, 400, false);
  }

  const userAlreadyExists = await userService.getUserByUsername(user.username, false);
  if (!userAlreadyExists) {
    try {
      const result = await userService.createUser(user);
      return result;
    } catch (err) {
      throw new ValidationError(err.message, 500, true);
    }
  } else {
    throw new ValidationError('User already exists!', 400, false);
  }
};

exports.login = async (user) => {
  if (!user.username || !user.password) {
    throw new ValidationError('All fields are required!', 400, false);
  }

  try {
    const userExists = await userService.getUserByUsername(user.username, false);    
    if (userExists) {
      const isPasswordMatched = await comparePassword(user.password,userExists.password);
      if (!isPasswordMatched) {
        throw new ValidationError('Incorrect email or password', 401, false);
      }
      return new userDTO(userExists);
    } else {
      throw new ValidationError('Incorrect email or password', 401, false);
    }
  } catch (err) {
    throw new ValidationError(err.message, err.statusCode, true);
  }
};
