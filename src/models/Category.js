const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const { Exercise } = require('../models/Exercise');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    }
},
{
    sequelize,
    paranoid: true,
});

console.log(sequelize.models);

Category.hasMany( sequelize.models.Exercise, {foreignKey: 'cid'} );
Exercise.belongsTo(Category, { foreignKey: 'cid' })

module.exports = { Category };