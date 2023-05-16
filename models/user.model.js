const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.config");
require("dotenv").config();
const { hashPassword } = require("../utils/hashPassword");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      notEmpty: true,
      isAlphanumeric: true,
      validate: {
        isAlphanumeric: {
          msg: 'Username cannot contain space and special characters!',
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      notEmpty: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    }
  },{
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
         user.password = await hashPassword(user.password);
        }
    },
    beforeUpdate: async (user) => {
      console.log(user.password);
      if (user.password) {
        user.password = await hashPassword(user.password);
      }
  }
  }
  }
);

// (async () => {
//     await User.sync();  
// })()

module.exports = User;