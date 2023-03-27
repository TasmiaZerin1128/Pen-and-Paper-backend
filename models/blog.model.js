const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.config");
require("dotenv").config();
const User = require("./user.model");

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true,
      defaultValue: 'Untitled Blog'
    },
    description: {
      type: DataTypes.STRING,
    }
  }
);

User.hasMany(Blog, {
  foreignKey: "authorId", onDelete: 'cascade', hooks: true 
});

Blog.belongsTo(User, { as: "author" }, {
  foreignKey: "authorId"
});

(async () => {
  await Blog.sync(); 
})();

module.exports = Blog;