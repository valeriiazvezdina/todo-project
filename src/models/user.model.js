const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const userModel = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
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