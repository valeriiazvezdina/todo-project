const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const userModel = sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        email: {
           type: DataTypes.STRING,
           allowNull: false,
           unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

module.exports = userModel;