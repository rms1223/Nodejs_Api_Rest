const express = require("express");
const app = express();
const { get_Aceptaciones_General, get_Aceptaciones_CE, set_Aceptaciones_CE } = require("../database/operaciones_basedatos_Inventario")
const { verifyToken } = require("../middlewares/authentication_token");

//---------------------------------------------------Muestra Todas las aceptaciones de Rec Registradas en el Sistema-----------------------------------------------------//
app.get('/api/aceptaciones/list', verifyToken, async function(req, res) {
    const inventory = await get_Aceptaciones_General();
    res.json(inventory);
});

//---------------------------------------------------Muestra el estado de las aceptaciones Por Centro Educativo----------------------------------------------------------//
app.get('/api/aceptaciones/:codigo', verifyToken, async function(req, res) {
    const inventory = await get_Aceptaciones_CE(req.params.codigo);
    res.json(inventory);
});
app.post('/api/aceptaciones/', verifyToken, async function(req, res) {
    try {
        let cod = req.body.codigo;
        let cartel = req.body.cartel;
        let estado = req.body.estado;
        let descripcion = req.body.descripcion;
        let fecha = req.body.fecha;
        await set_Aceptaciones_CE(cartel, cod, estado, descripcion, fecha);
        res.json({ "msg": "Success" })
    } catch (error) {
        res.json({ "msg: ": error });
    }

});

module.exports = app;