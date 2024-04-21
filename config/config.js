const Sequelize = require('sequelize');

// Replace the dotenv package with direct configuration
const sequelize = new Sequelize('techblog_db', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;
