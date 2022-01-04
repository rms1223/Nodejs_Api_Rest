//---------------------------------------------------Parametros de Conexion Mongo Db-----------------------------------------------------//
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const database = ""

async function getConection() {
    await client.connect();
    return client.db(database);
}

module.exports = { getConection }