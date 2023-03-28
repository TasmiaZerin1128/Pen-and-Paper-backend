const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.config");
require("dotenv").config();
const { hashPassword } = require("../utils/hashPassword");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    },
    username: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
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
      notNull: true,
      notEmpty: true
    }
  },{
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
         user.password = await hashPassword(user.password);
        }
    }
  }
  }
);

(async () => {
    await User.sync();  
})();

module.exports = User;