const express = require('express');

exports.getAllUsers = ((req, res) => {
    res.send('Getting all users');
})

exports.getSingleUser = ((req, res) => {
    res.send('Getting user ' + req.params.id);
})

exports.createUser = ((req, res) => {
    res.send('Created User');
})

exports.updateUser = async (req, res, next) => {
    await res.send('Updated user');
}

exports.deleteUser = (req, res) => {
    res.send('User deleted');
}