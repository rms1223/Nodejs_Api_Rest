require("dotenv").config()
const { get_mongodb_connection } = require("../config/connection_mongo_database");
const AXIOS = require('axios');
const { urlencoded } = require("express");

async function get_device_information_from_code(code) {
    const mongodb_connection = await get_mongodb_connection();
    const device = mongodb_connection.collection(process.env.MONGODB_COLLECTION_DEVICE);
    const response_query = await device.aggregate([
            { $match: { 'name': { '$regex': '.*' + code + '.*' } } },
            {
                $lookup: {
                    from: 'devices_status',
                    localField: 'serial',
                    foreignField: 'serial',
                    as: 'estado_dispositivos'
                }
            },
            { "$unwind": "$estado_dispositivos" }
        ]).toArray()
        .catch(err => {
            console.log(err)
        });
    return response_query;
}
async function get_network_clients(code) {
    const mongodb_connection = await get_mongodb_connection();
    const clients_networks = mongodb_connection.collection(process.env.MONGODB_COLLECTION_CLIENTS);
    const response_query = await clients_networks.find({ 'codigo': code }).toArray();
    return response_query;
}

async function get_id_network_from_code(code) {
    const mongodb_connection = await get_mongodb_connection();
    const networks = mongodb_connection.collection(process.env.MONGODB_COLLECTION_NETWORK);
    const response_network = await networks.findOne({ 'codigo': { '$regex': '.*' + code + '.*' } });
    if (response_network == undefined) {
        return 0
    } else {
        return response_network["idRed"];
    }
}

async function get_network_clients_from_code(code) {
    const id = await get_id_network_from_code(code);

    if (id == 0) {
        return { "message": "No hay Registros" }
    }
    const PATH_MERAKI_CLIENTS = `https://api.meraki.com/api/v1/networks/${id}/clients?perPage=1000`;
    const response_query = await AXIOS.get(PATH_MERAKI_CLIENTS, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Cisco-Meraki-API-Key': 'ee0ef35b4d0f459b5491d697f90d053ec0c700dc'
        }
    });
    return response_query['data'];
}



async function get_id_network_from_code(code) {
    try {
        const mongodb_connection = await get_mongodb_connection();
        const networks = mongodb_connection.collection(process.env.MONGODB_COLLECTION_NETWORK);
        const template = mongodb_connection.collection(process.env.MONGODB_COLLECTION_TEMPLATE);
        const request_network = await networks.findOne({ 'codigo': code });
        let response_query = ""
        if (request_network["id_template"] != "No especificado") {
            let valor = await template.find({ 'id': request_network["id_template"] }).toArray();
            response_query = valor[0].name;
        } else {
            response_query = request_network["id_template"];
        }
        return response_query;
    } catch (exception) {
        return "......"
    }

}
module.exports = {
    get_device_information_from_code,
    get_network_clients,
    get_id_network_from_code,
    get_network_clients_from_code
}