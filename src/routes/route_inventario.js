const express = require("express");
const app = express();
const {
    get_Inventory_General,
    get_Inventory_Institution,
    get_Inventory_Stock,
    get_Inventory_Assigned_Institution,
    get_Id_Carteles,
    get_CE_RedEducativa,
    get_CE_Informacion,
    get_Nombre_CE
} = require("../database/operaciones_basedatos_Inventario")

const { verifyToken } = require("../middlewares/authentication_token");

//----------------------------------------------------------------Buscar Nombre del CE por Codigo Presupuestario----------------------------------------------------//
app.get('/api/institucion/:codigoCE', verifyToken, async function(req, res) {
    const CE = await get_Nombre_CE(req.params.codigoCE);
    res.json(CE);
});
//----------------------------------------------------------------Inventario General de Todos los equipos en el sistema---------------------------------------------//
app.get('/api/inventario/lista', verifyToken, async function(req, res) {
    const inventory = await get_Inventory_General();
    res.json(inventory);
});

//----------------------------------------------------------------Equipos Asignado al centro Educativo por Cartel--------------------------------------------------//
app.get('/api/inventario/Institucion/asignado/:codigo', verifyToken, async function(req, res) {
    const inventory = await get_Inventory_Assigned_Institution(req.params.codigo);
    res.json(inventory);
});

//----------------------------------------------------------------Equipos que se encuentran instalados en los Centros Educativos-----------------------------------//
app.get('/api/inventario/institution/instalados/:codigo', verifyToken, async function(req, res, next) {
    const inven_institu = await get_Inventory_Institution(req.params.codigo);
    res.json(inven_institu);
});

//----------------------------------------------------------------Inventario Equipos en Stock por Cartel ----------------------------------------------------------// 
app.get('/api/inventario/stock/:cartel', verifyToken, async function(req, res, next) {

    const inven_stock = await get_Inventory_Stock(req.params.cartel);
    res.json(inven_stock);

});
//----------------------------------------------------------------Informacion de los Centros Educativos en CE-----------------------------------------------------//  
app.get('/api/ce/rededucativa/:codigo', verifyToken, async function(req, res, next) {
    const ce = await get_CE_RedEducativa(req.params.codigo);
    res.json(ce);

});
//----------------------------------------------------------------Obtener Id de Carteles-------------------------------------------------------------------------//
app.get('/api/carteles/', verifyToken, async function(req, res, next) {

    const inven_stock = await get_Id_Carteles();
    res.json(inven_stock);

});

//----------------------------------------------------------------Informacion de Centros Educativos-------------------------------------------------------------//
app.get('/api/ce/informacion/:codigo', verifyToken, async function(req, res, next) {

    const info_ce = await get_CE_Informacion(req.params.codigo);
    res.json(info_ce);

});
module.exports = app;