const { Sequelize } = require('sequelize');
require('dotenv').config();

const mySQLpassword = process.env.mySQLpassword;

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('fitness_assistant', 'root', mySQLpassword, {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


const connectDB = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const disconnectDB = async() => {
    await sequelize.close();
    console.log('connection has been closed successfully');
}

module.exports = { connectDB, disconnectDB, sequelize };