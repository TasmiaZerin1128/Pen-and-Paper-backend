const express = require('express');
const userService = require('../services/user.service');

exports.getAllUsers = ((req, res) => {
    res.send('Getting all users');
})

exports.getUserbyId = ((req, res) => {
    res.send('Getting user ' + req.params.id);
})

exports.createUser = (async (req, res) => {
    try{
        userService.createUser(req.body);
        res.status(200).send('User created successfully');
    }
    catch{
        res.send('A problem occured!');
    }
})

exports.updateUserbyId = async (req, res, next) => {
    const id = req.params.id;
    await res.send('Updated user');
}

exports.deleteUserbyId = (req, res) => {
    const id = req.params.id;
    res.send('User deleted');
}