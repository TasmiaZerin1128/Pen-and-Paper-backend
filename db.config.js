const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PORT = process.env.DB_PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  // logging: logging
});

async function connectToDatabase() {
  //Connect to db
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { connectToDatabase, sequelize };
