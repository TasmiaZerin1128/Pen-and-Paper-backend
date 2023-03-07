const mysql = require("mysql");
const dotenv = require("dotenv");
const userModel = require("./models/user");

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const TABLENAME = process.env.TABLENAME;

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pen_paper",
});

function connectToDatabase() {
  //Connect to db
  db.connect((err) => {
    if (err) {
      console.log("Connection to database failed!");
      throw err;
    }
    console.log(`${APP_NAME} successfully connected to database.`);
    db.query(userModel.createUsers, function (err, result) {
      if (err) {
        throw err;
      }
      console.log(`${TABLENAME} Table created`);
    });
  });
}

module.exports = { connectToDatabase, db };
