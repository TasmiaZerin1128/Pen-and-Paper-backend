const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.config");
require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.SALTROUND);

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
      notEmpty: true
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
          const salt = await bcrypt.genSalt(saltRounds);
         user.password = await bcrypt.hash(user.password, salt);
        }
    }
  }
  },
  {
    tableName: "Users",
  }
);

(async () => {
    await User.sync({force:true});  
})();


module.exports = User;