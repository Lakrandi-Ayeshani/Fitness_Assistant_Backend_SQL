const { sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    resourceType: {
        type: DataTypes.STRING,
    },
    resourceID: {
        type: DataTypes.STRING,
    },
    activityType: {
        type: DataTypes.STRING
    },
    oldValue: {
        type: DataTypes.JSON
    },
    newValue: {
        type: DataTypes.JSON
    }
});

module.exports = { Activity };