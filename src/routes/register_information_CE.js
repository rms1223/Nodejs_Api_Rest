const express = require("express");
const app = express();
const { verify_token } = require("../middlewares/authToken");
const { save_control_visit_in_centroeducativo, save_changes_password_in_networks,get_changes_password_in_networks,
        get_control_visit_in_centroeducativo,get_total_devices_in_centroeducativo_from_cartel,
        get_total_aceptaciones_from_cartel,get_total_no_aceptaciones_from_cartel } = require("../database/database_mysql_inventory_operations")

app.post('/api/registrovisitas/', verify_token, async function(req, res) {
    try {
        let data = await save_control_visit_in_centroeducativo(req.body.cartel, req.body.codigo, req.body.tecnico, req.body.fecha);
        res.status(200).json({
            "Message": "Visita Registrada",
        });
    } catch (error) {
        res.status(500).json({ "Message: ": error });
    }

});
app.post('/api/cambioscontrasena/', verify_token, async function(req, res) {
    try {
        let data = await save_changes_password_in_networks(req.body.codigo, req.body.ce, req.body.cartel, req.body.data, req.body.fecha, req.body.dashboard);
        res.status(200).json({
            "Message": "Visita Registrada",
        });
    } catch (error) {
        res.status(500).json({ "Message: ": error });
    }

});

app.get('/api/cambiosredce/', verify_token, async function(req, res) {
    try {
        let data = await get_changes_password_in_networks();
        res.json(data);
    } catch (error) {
        res.status(500).json({ "Message: ": error });
    }

});
app.get('/api/visitascontrolce/', verify_token, async function(req, res) {
    try {
        let data = await get_control_visit_in_centroeducativo();
        res.json(data);
    } catch (error) {
        res.status(500).json({ "Message: ": error });
    }

});

app.get('/api/cantidadaceptacionescecartel/:cartel', verify_token, async function(req, res) {
    try {
        let data_total_ce = await get_total_devices_in_centroeducativo_from_cartel(req.params.cartel);
        let data_aceptaciones = await get_total_aceptaciones_from_cartel(req.params.cartel);
        let data_no_aceptaciones = await get_total_no_aceptaciones_from_cartel(req.params.cartel);
        res.json({
            data_total_ce,
            data_aceptaciones,
            data_no_aceptaciones
        });
    } catch (error) {
        res.status(500).json({ "Message: ": error });
    }

});



module.exports = app;