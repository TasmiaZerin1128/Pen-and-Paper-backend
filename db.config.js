const mysql = require("mysql");
const dotenv = require("dotenv");
const userModel = require("./models/user");
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
  dialect: 'mysql'
});



async function connectToDatabase() {
  //Connect to db
//  await db.connect((err) => {
//     if (err) {
//       console.log("Connection to database failed!");
//       throw err;
//     }
//     console.log(`${APP_NAME} successfully connected to database.`);
//     db.query(userModel.createUsers, function (err, result) {
//       if (err) {
//         throw err;
//       }
//       console.log(`${TABLENAME} Table created`);
//     });
//   });

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

}

module.exports = { connectToDatabase, sequelize };
