const db = require('../db');
const { DataTypes } = require('sequelize');

const Pet = db.define('pet', {
    user_id: {
        type: DataTypes.STRING,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    raza: {
        type: DataTypes.STRING,
    },
    edad: {
        type: DataTypes.INTEGER,
    },
    peso: {
        type: DataTypes.INTEGER,
    },
    genero: {
        type: DataTypes.STRING,
    }
})

module.exports = Pet;