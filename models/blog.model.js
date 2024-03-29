const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.config");
require("dotenv").config();
const User = require("./user.model");

const Blog = sequelize.define(
  "blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: 'Untitled Blog'
    },
    description: {
      type: DataTypes.TEXT,
    }
  }
);

// User.hasMany(Blog, {
//   foreignKey: "authorId", onDelete: 'cascade', hooks: true 
// });

// Blog.belongsTo(User, { as: "author" }, {
//   foreignKey: "authorId"
// });

// (async () => {
//   await Blog.sync(); 
// })();

module.exports = Blog;