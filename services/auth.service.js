const userService = require("../services/user.service");
const userUtils = require("../utils/userValidation");
const { comparePassword } = require("../utils/hashPassword");
const userDTO = require("../DTOs/user.dto");
const AppError = require("../utils/errorHandler");

exports.register = async (user) => {
  const userValid = userUtils.userValidator(user);
  if (!userValid.valid) {
    throw new AppError(userValid.message, 400, false);
  }

  try {
    const userAlreadyExists = await userService.getUserByUsername(user.username,false);
    if (!userAlreadyExists) {
      const result = await userService.createUser(user);
      return result;
    } else {
      throw new AppError("User already exists!", 400, false);
    }
  } catch (err) {
    throw new AppError(err.message, 500, true);
  }
};

exports.login = async (user) => {
  if (!user.username || !user.password) {
    throw new AppError("All fields are required!", 400, false);
  }

  try {
    const userExists = await userService.getUserByUsername(user.username,false);
    if (userExists) {
      const isPasswordMatched = await comparePassword(
        user.password,
        userExists.password
      );
      if (!isPasswordMatched) {
        throw new AppError("Incorrect email or password", 401, false);
      }
      return new userDTO(userExists);
    } else {
      throw new AppError("Incorrect email or password", 401, false);
    }
  } catch (err) {
    throw new AppError(err.message, err.statusCode, true);
  }
};
