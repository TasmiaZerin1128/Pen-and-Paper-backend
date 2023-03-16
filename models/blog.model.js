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
    },
    authorId: {
        type: DataTypes.UUID,
        notNull: true,
        notEmpty: true,
        // references: 'Users',
        // referencesKey: 'id'
    },
    authorName: {
      type: DataTypes.STRING,
    }
  }
);

(async () => {
    await Blog.sync(); 
})();

// Blog.belongsTo(User, {
//   foreignKey: "authorId"
// });

module.exports = Blog;