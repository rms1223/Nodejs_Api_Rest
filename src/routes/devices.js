const express = require("express");
const APP = express();
const { get_devices_list_in_database, get_information_device_from_serial, 
        get_system_status, get_total_device_in_dashboard } = require("../database/database_mysql_network_operations");
const { get_device_information_from_code,get_network_clients, get_id_network_from_code, get_network_clients_from_code } = require("../database/database_mongo_operations");
const { verify_token } = require("../middlewares/authToken");

APP.get('/api/device/list', verify_token, async function(req, res) {
    try {
        const equipos = await get_devices_list_in_database();
        res.json(equipos);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});

APP.get('/api/device/serial/:serial', verify_token, async function(req, res, next) {
    try {
        const equipo = await get_information_device_from_serial(req.params.serial);
        res.json(equipo);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});

APP.get('/api/device/codigo/:codigo', verify_token, async function(req, res, next) {
    try {
        const devices = await get_device_information_from_code(req.params.codigo);
        res.json(devices);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }

});
APP.get('/api/clients/codigo/:codigo', verify_token, async function(req, res, next) {
    try {
        const clients = await get_network_clients(req.params.codigo);
        res.json(clients);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});

APP.get('/api/red/template/:codigo', async function(req, res, next) {
    try {
        const template = await get_id_network_from_code(req.params.codigo);
        res.json(template);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});
APP.get('/api/estado/sistema/', async function(req, res, next) {
    try {
        res.json(await get_system_status());
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});
APP.get('/api/device/totaldashboard/', async function(req, res, next) {
    try {
        res.json(await get_total_device_in_dashboard());
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
});

APP.get('/api/red/clientes/:codigo', async function(req, res, next) {
    try {
        const devices = await get_network_clients_from_code(req.params.codigo);
        res.json(devices);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});


module.exports = APP;