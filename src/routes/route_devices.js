const express = require("express");
const app = express();
const { get_Device_List, get_Device_Serial, Get_Estado_Sistema } = require("../database/operaciones_basedatos_equipos");
const { Get_Devices, Get_Clients_Network, Get_Network_Template } = require("../database/operaciones_mongo");
const { verifyToken } = require("../middlewares/authentication_token");

//---------------------------------------------------Muestra Todos equipos externos en las Redes (Servidores, IMpresoras)--------------------------------------------------//
app.get('/api/device/list', verifyToken, async function(req, res) {
    const equipos = await get_Device_List();
    res.json(equipos);
});
//---------------------------------------------------Busca e equipo por numero de Serie---------------------------------------------------------------------------------//
app.get('/api/device/serial/:serial', verifyToken, async function(req, res, next) {
    const equipo = await get_Device_Serial(req.params.serial);
    res.json(equipo);
});
//---------------------------------------------------Muestra los equipos por Codigo del Centro Educativo----------------------------------------------------------------//
app.get('/api/device/codigo/:codigo', verifyToken, async function(req, res, next) {

    const devices = await Get_Devices(req.params.codigo);
    res.json(devices);

});
//---------------------------------------------------Muestra los equipos externos en las Redes por Codigo del Centro Educativo (Servidores, IMpresoras)----------------//
app.get('/api/clients/codigo/:codigo', verifyToken, async function(req, res, next) {

    const clients = await Get_Clients_Network(req.params.codigo);
    res.json(clients);

});
//---------------------------------------------------Muestra el template de Red del Centro Educativo------------------------------------------------------------------//
app.get('/api/red/template/:codigo', async function(req, res, next) {

    const template = await Get_Network_Template(req.params.codigo);
    res.json(template);

});
//---------------------------------------------------Muestra el estado del sistema API-------------------------------------------------------------------------------//
app.get('/api/estado/sistema/', async function(req, res, next) {

    res.json(await Get_Estado_Sistema());

});

module.exports = app;