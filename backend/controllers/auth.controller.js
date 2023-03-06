const express = require("express");

exports.getAllUsers = ((req, res) => {
    res.send('Getting a list of users');
});


exports.getIndUser = ((req, res) => {
    res.send('Getting user ' + req.params.id);
})
