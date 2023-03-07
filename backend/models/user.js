const dotenv = require('dotenv').config();

const TABLENAME = process.env.TABLENAME;

module.exports = {
    createUsers : `CREATE TABLE IF NOT EXISTS ${TABLENAME} 
    (id VARCHAR(255) PRIMARY KEY, 
    username VARCHAR(255) UNIQUE NOT NULL, 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATE,
    updatedAt DATE)`
}