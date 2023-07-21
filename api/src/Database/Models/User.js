const db = require('../db');
const { DataTypes } = require('sequelize');

const User = db.define('user', {
    identification_number: {
        type: DataTypes.STRING,
        unique: true,
    },
    name:{
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    username:{
        type: DataTypes.STRING,
        unique: true,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
    },
    phone_number:{
        type: DataTypes.STRING,
        defaultValue: ""
    },
    rol: {
        type: DataTypes.INTEGER,
    }
})

module.exports = User;