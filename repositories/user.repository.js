const dotenv = require("dotenv").config();
const database = require("../db.config");
const userDTO = require('../DTOs/user.dto');

const TABLENAME = process.env.TABLENAME;

function makeQuery(sql, params) {
  return new Promise((resolve, reject) => {
    database.db.query(sql, params, (error, results) => {
      if (error) {
        console.log(error.sqlMessage);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.createUser = async (username, email, password) => {
  const result = await makeQuery(
    "INSERT INTO " +
      TABLENAME +
      "(id, username, email, password, createdAt, updatedAt) VALUES (uuid(), ?, ? , ?, now(), now())",
    [username, email, password]
  );
  console.log("User created successfully");
  return result;
};

exports.getAllUsers = async () => {
  const query = "SELECT * FROM " + TABLENAME;
  const result = await makeQuery(query);

  const allUsers = [];

  result.forEach(element => {
    allUsers.push(new userDTO(element));
  });

  return allUsers;
};

exports.getUserbyUsername = async (username) => {
  const result = await makeQuery(
    "SELECT * FROM " + TABLENAME + " where `username` = ?",
    [username]
  );

  const userdto = [];
  result.forEach(element => {
    userdto.push(new userDTO(element));
  });

  return userdto;
};

exports.updateUser = async (username, updatedPassword) => {
  const result = await makeQuery(
    "UPDATE " +
      TABLENAME +
      " SET `password`= ?, `updatedAt`= now() where `username` = ?",
    [updatedPassword, username]
  );
  return result;
};

exports.deleteUser = async (username) => {
  const result = await makeQuery(
    "DELETE FROM " + TABLENAME + " where `username` = ?",
    [username]
  );
  return result;
};


exports.getUserbyEmail = async (email) => {
  const result = await makeQuery(
    "SELECT * FROM " + TABLENAME + " where `email` = ?",
    [email]
  );

  const userdto = [];
  result.forEach(element => {
    userdto.push(new userDTO(element));
  });

  return userdto;
};