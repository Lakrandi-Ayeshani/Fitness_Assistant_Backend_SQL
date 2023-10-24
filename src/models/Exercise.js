const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Exercise = sequelize.define('exercise', {
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});

module.exports = { Exercise };