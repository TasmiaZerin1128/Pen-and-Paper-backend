const mysql = require("mysql");
const dotenv = require("dotenv");
const winston = require('winston');
const { Sequelize } = require('sequelize');

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const TABLENAME = process.env.TABLENAME;

//Create connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "pen_paper",
// });

const sequelize = new Sequelize('pen_paper', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: logging
});

// function logging(){
//   const logger = winston.createLogger({
//     transports: [
//       new winston.transports.Console(),
//       new winston.transports.File({ filename: 'combined.log' })
//     ]
//   }); 
// }


async function connectToDatabase() {
  //Connect to db
try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

}

module.exports = { connectToDatabase, sequelize };
