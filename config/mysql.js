const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const dbConnectMysql = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync();
    await sequelize.sync({ alter: true })
    console.log("Mysql Conexion Correcta 🚀🚀");
  } catch (error) {
    console.log("Mysql Error de Conexion", error);
  }
};



module.exports = { sequelize, dbConnectMysql}