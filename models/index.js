const { sequelize } = require('../db.config');
const User = require('./user.model');
const Blog = require('./blog.model');

User.hasMany(Blog, {
    foreignKey: 'authorId', onDelete: 'cascade', hooks: true 
  });
  
Blog.belongsTo(User, { as: "author" }, {
    foreignKey: "authorId"
});

async function syncModels () {
    try {
        await sequelize.sync();
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.log("Model synchronization error! "+ error);
    }
};

module.exports = syncModels;