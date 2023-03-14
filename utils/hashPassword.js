const bcrypt = require("bcrypt");
require("dotenv").config();

async function hashPassword(password){
    const saltRounds = process.env.SALTROUND;
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    const hashedPassword = await bcrypt.hash(password,salt);

    return hashedPassword;
}

async function comparePassword(passwordEntered, hashedPassword){
    return await bcrypt.compare(passwordEntered, hashedPassword);
}

module.exports = { hashPassword, comparePassword };