const UserDTO = require("../DTOs/user.dto");
const userRegisterDto = require("../DTOs/userRegister.dto");
const User = require("../models/user.model");
const { SequelizeValidationError } = require("../utils/errorHandler");

exports.getAllUsers = async (limit, offset) => {
  try {
    const result = await User.findAll({ offset : offset, limit : limit });
    const allUsers = [];
    result.forEach((element) => {
      allUsers.push(new UserDTO(element));
    });

    return allUsers;
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
};

exports.getUserByUsername = async (username) => {
  try {
    username = username.toLowerCase();
    const result = await User.findOne({ where: { username: username } });
    return result;
  } catch (err) {
    throw new SequelizeValidationError(err.message, 400);
  }
};

exports.getUserDTOByUsername = async (username) => {
    try {
      username = username.toLowerCase();
      const result = await User.findOne({ where: { username: username } });
      return result;
    } catch (err) {
        throw new SequelizeValidationError(err, 400);
    }
  };

exports.updateUser = async (username, updatedPassword) => {
  try {
    username = username.toLowerCase();
    const result = await User.update(
      { password: updatedPassword },
      { where: { username: username } }
    );
    return result;
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
};

exports.deleteUser = async (username) => {
  try {
    username = username.toLowerCase();
    const result = User.destroy({ where: { username: username } });
    return result;
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ where: { email: email } });
    const userdto = new userDTO(result);
    return userdto;
  } catch (err) {
    throw new SequelizeValidationError(err, 400);
  }
};

exports.createUser = async (user) => {
  const userToRegister = new userRegisterDto(user);
  try {
      const result = await User.create(userToRegister);
      console.log("User created successfully");
      return result;
    } catch (err) {
        throw new SequelizeValidationError(err, 400);
    }
}