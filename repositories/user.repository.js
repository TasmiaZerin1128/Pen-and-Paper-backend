/* eslint-disable no-param-reassign */
const UserDTO = require('../DTOs/user.dto');
const UserRegisterDto = require('../DTOs/userRegister.dto');
const User = require('../models/user.model');

exports.getAllUsers = async (limit, offset) => {
    try {
        const result = await User.findAll({ offset, limit });
        const allUsers = [];
        result.forEach((element) => {
            allUsers.push(new UserDTO(element));
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
        const result = await User.findOne({ where: { username } });
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.updateUser = async (username, updatedPassword) => {
    try {
        username = username.toLowerCase();
        const result = await User.update({ password: updatedPassword }, { where: { username } });
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
        const result = User.destroy({ where: { username } });
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.getUserByEmail = async (email) => {
    try {
        const result = await User.findOne({ where: { email } });
        const userdto = new UserDTO(result);
        return userdto;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.createUser = async (user) => {
    const userToRegister = new UserRegisterDto(user);
    try {
        const result = await User.create(userToRegister);
        console.log('User created successfully');
        return result;
    } catch (err) {
        throw console.error(err);
    }
};
