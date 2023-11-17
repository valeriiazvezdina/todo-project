const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const userModel = require('./user.model');

const todoModel = sequelize.define(
    'todos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
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
        idUser: {
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