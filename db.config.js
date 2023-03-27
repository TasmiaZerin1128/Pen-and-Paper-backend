const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const { APP_NAME } = process.env;

const sequelize = new Sequelize(APP_NAME, 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: logging
});

async function connectToDatabase() {
    // Connect to db
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connectToDatabase, sequelize };
