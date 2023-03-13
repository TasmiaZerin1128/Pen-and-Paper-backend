const { Sequelize, DataTypes } = require("sequelize");
const {sequelize} = require("../db.config");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
      notNull: false,
      notEmpty: true
    }
  },
  {
    tableName: "Users",
  }
);

(async () => {
    await User.sync();  
})();


module.exports = User;