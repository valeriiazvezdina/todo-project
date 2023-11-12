const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const userModel = require('./user.model');

const todoModel = sequelize.define(
    'todo',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: userModel,
                key: 'id'
            }
        }
    }
);

module.exports = todoModel;