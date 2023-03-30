const userService = require("../services/user.service");
const { comparePassword } = require("../utils/hashPassword");
const userDTO = require("../DTOs/user.dto");
const { AppError } = require("../utils/errorHandler");

("use strict");

exports.register = async (user) => {
    
    const userAlreadyExists = await userService.getUserByUsername(user.username);
    if (userAlreadyExists) {
      throw new AppError("User already exists!", 400, false);
    }
    const result = await userService.createUser(user);
    return result;

};

exports.login = async (user) => {
    
    const userExists = await userService.getUserByUsername(user.username);
    if (!userExists) {
      throw new AppError("Incorrect username or password", 401, false);
    }
    const isPasswordMatched = await comparePassword(user.password, userExists.password);
    if (!isPasswordMatched) {
      throw new AppError("Incorrect username or password", 401, false);
    }
    return new userDTO(userExists);
};
