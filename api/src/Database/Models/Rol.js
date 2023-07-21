const db = require('../db');
const { DataTypes } = require('sequelize');

const Rol = db.define('rol', {
    rol:{
        type: DataTypes.STRING,
    }
})

module.exports = Rol;