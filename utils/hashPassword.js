const bcrypt = require("bcrypt");
require('dotenv').config();

async function hashPassword(password){
    const saltRounds = process.env.SALTROUND;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password,salt);

    return hashedPassword;
}

module.exports = hashPassword;