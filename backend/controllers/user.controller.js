const express = require('express');
const userService = require('../services/user.service');

exports.getAllUsers = ((req, res) => {
    res.send('Getting all users');
})

exports.getUserbyUsername = ((req, res) => {
    res.send('Getting user ' + req.params.id);
})

exports.createUser = async (req, res) => {
    try{
        const data = await userService.createUser(req.body);
        res.status(data.status).send(data.message);
    }
    catch{
        res.send('A problem occured!');
    }
}

exports.updateUserbyUsername = async (req, res, next) => {
    const id = req.params.id;
    await res.send('Updated user');
}

exports.deleteUserbyUsername = (req, res) => {
    const id = req.params.id;
    res.send('User deleted');
}