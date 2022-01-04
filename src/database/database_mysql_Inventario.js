//---------------------------------------------------Parametros de Conexion Mysql Base de datos Inventarios-----------------------------------------------------//
const mysql = require("promise-mysql")

const conection = mysql.createPool({
    host: "",
    user: "",
    port: 3306,
    password: "",
    database: "",
    dialect: "mysql",
    multipleStatements: true,
    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    insecureAuth: true
});


function getConection() {
    return conection;
}


module.exports = { getConection }