const userRegisterDto = require("../DTOs/userRegister.dto");
const User = require("../models/user.model");
const { SequelizeValidationError } = require("../utils/errorHandler");

exports.getAllUsers = async (limit, offset) => {
    const result = await User.findAll({ 
        order: [['updatedAt', 'DESC']], 
        offset : offset, 
        limit : limit 
    });
    return result;
};

exports.getUserByUsername = async (username) => {
    const result = await User.findOne({ where: { username: username.toLowerCase() } });
    return result;
};

exports.updateUser = async (username, updatedPassword) => {
    const result = await User.update(
      { password: updatedPassword },
      { where: { username: username.toLowerCase() },
      individualHooks: true}
    );
    return result;
};

exports.deleteUser = async (username) => {
    const result = User.destroy({ where: { username: username.toLowerCase() } });
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