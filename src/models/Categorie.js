const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Categorie = sequelize.define('Categorie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    }
});

module.exports = { Categorie };