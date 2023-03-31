const userRegisterDto = require("../DTOs/userRegister.dto");
const User = require("../models/user.model");
const { SequelizeValidationError } = require("../utils/errorHandler");

exports.getAllUsers = async (limit, offset) => {
    const result = await User.findAll({ offset : offset, limit : limit });
    return result;
};

exports.getUserByUsername = async (username) => {
    username = username.toLowerCase();
    const result = await User.findOne({ where: { username: username } });
    return result;
};

exports.updateUser = async (username, updatedPassword) => {
    username = username.toLowerCase();
    const result = await User.update(
      { password: updatedPassword },
      { where: { username: username },
      individualHooks: true}
    );
    return result;
};

exports.deleteUser = async (username) => {
    username = username.toLowerCase();
    const result = User.destroy({ where: { username: username } });
    return result;
};

exports.getUserByEmail = async (email) => {
    const result = await User.findOne({ where: { email: email } });
    return result;
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