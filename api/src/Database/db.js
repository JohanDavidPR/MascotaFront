const { Sequelize } = require("sequelize");

const db = new Sequelize({
    database:  process.env.BD_NAME,
    username: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: "postgres",
    logging: false,
    // dialectOptions: {
    //   ssl: {
    //     require: true, // This will help you. But you will see nwe error
    //     rejectUnauthorized: false // This line will fix new error
    //   }
    // },
  })

module.exports = db;