const express = require("express");
const APP = express();
const { get_general_status_aceptaciones, get_status_aceptaciones_from_code, save_status_aceptaciones } = require("../database/database_mysql_inventory_operations")
const { verify_token } = require("../middlewares/authToken");

APP.get('/api/aceptaciones/list', verify_token, async function(req, res) {
    try {
        const inventory = await get_general_status_aceptaciones();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
});
APP.get('/api/aceptaciones/:codigo', verify_token, async function(req, res) {

    try {
        const inventory = await get_status_aceptaciones_from_code(req.params.codigo);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});
APP.post('/api/aceptaciones/', verify_token, async function(req, res) {
    try {
        let cod = req.body.codigo;
        let cartel = req.body.cartel;
        let estado = req.body.estado;
        let descripcion = req.body.descripcion;
        let fecha = req.body.fecha;
        await save_status_aceptaciones(cartel, cod, estado, descripcion, fecha);
        res.json({ "Message": "Success" })
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }

});

module.exports = APP;