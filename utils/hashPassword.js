const bcrypt = require('bcrypt');
require('dotenv').config();

async function hashPassword(password) {
    const saltRounds = parseInt(process.env.SALTROUND, 10);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

async function comparePassword(passwordEntered, hashedPassword) {
    return bcrypt.compare(passwordEntered, hashedPassword);
}

module.exports = { hashPassword, comparePassword };
