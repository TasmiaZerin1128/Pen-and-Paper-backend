const userDTO = require("../DTOs/user.dto");
const userRegisterDto = require("../DTOs/userRegister.dto");
const User = require("../models/user.model");

exports.getAllUsers = async () => {
  try {
    const result = await User.findAll();
    const allUsers = [];
    result.forEach((element) => {
      allUsers.push(new userDTO(element));
    });

    return allUsers;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getUserByUsername = async (username) => {
  try {
    username = username.toLowerCase();
    const result = await User.findOne({ where: { username: username } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.updateUser = async (username, updatedPassword) => {
  try {
    username = username.toLowerCase();
    const result = await User.update(
      { password: updatedPassword },
      { where: { username: username } }
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.deleteUser = async (username) => {
  try {
    username = username.toLowerCase();
    const result = User.destroy({ where: { username: username } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ where: { email: email } });
    const userdto = new userDTO(result);
    return userdto;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.createUser = async (user) => {
  const userToRegister = new userRegisterDto(user);
  try {
      const result = await User.create(userToRegister);
      console.log("User created successfully");
      return result;
    } catch (err) {
      throw console.error(err);
    }
}