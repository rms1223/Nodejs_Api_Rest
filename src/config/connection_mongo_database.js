require("dotenv").config()

let MongoClient = require('mongodb').MongoClient;
const mongodb_client = new MongoClient(process.env.MONGODB_PATH);

async function get_mongodb_connection() {
    await mongodb_client.connect();
    return mongodb_client.db(process.env.MONGODB_DATABASE);
}

module.exports = { get_mongodb_connection }