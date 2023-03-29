const userService = require("../services/user.service");
const userUtils = require("../utils/userValidation");
const { comparePassword } = require("../utils/hashPassword");
const userDTO = require("../DTOs/user.dto");
const { AppError } = require("../utils/errorHandler");

("use strict");

exports.register = async (user) => {
  try {
    const userValid = userUtils.userValidator(user);
    if (!userValid.valid) {
      throw new AppError(userValid.message, 400, false);
    }

    const userAlreadyExists = await userService.getUserByUsername(user.username);
    if (userAlreadyExists) {
      throw new AppError("User already exists!", 400, false);
    }
    const result = await userService.createUser(user);
    return result;
  } catch (err) {
    throw new AppError(err.message, err.statusCode, err.isOperational);
  }
};

exports.login = async (user) => {
  try {
    if (!user.username || !user.password) {
      throw new AppError("All fields are required!", 400, false);
    }

    const userExists = await userService.getUserByUsername(user.username);
    if (!userExists) {
      throw new AppError("Incorrect username or password", 401, false);
    }
    const isPasswordMatched = await comparePassword(user.password, userExists.password);
    if (!isPasswordMatched) {
      throw new AppError("Incorrect username or password", 401, false);
    }
    return new userDTO(userExists);
  } catch (err) {
    throw new AppError(err.message, err.statusCode, err.isOperational);
  }
};
