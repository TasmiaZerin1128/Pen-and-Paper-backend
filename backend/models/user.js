const dotenv = require('dotenv').config();

const TABLENAME = process.env.TABLENAME;

module.exports = {
    createUsers : `CREATE TABLE IF NOT EXISTS ${TABLENAME} 
    (Id INT AUTO_INCREMENT PRIMARY KEY, 
    Username VARCHAR(255) UNIQUE NOT NULL, 
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    CreatedAt DATE,
    UpdatedAt DATE)`
}