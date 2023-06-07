require("dotenv").config()
const mysql = require("promise-mysql")

const conection_mysql_database_inventory = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_INVENTORY,
    dialect: process.env.MYSQL_DIALECT,
    multipleStatements: true,
    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    insecureAuth: true
});


function get_mysql_connection_inventory() {
    return conection_mysql_database_inventory;
}


module.exports = { get_mysql_connection_inventory }