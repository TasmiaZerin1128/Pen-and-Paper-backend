const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.config");
require("dotenv").config();

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
    }
  }
);

(async () => {
    await Blog.sync(); 
})();


module.exports = Blog;