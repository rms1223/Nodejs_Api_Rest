const express = require("express");
const app = express();
const { get_brand_devices_in_dashboard,get_inventory_devices_general,get_inventory_device_institution_from_code, 
        get_inventory_in_stock,get_inventory_assigned_institution, 
        get_id_carteles,get_information_RedEducativa_from_code,get_information_centroeducativo_from_code } = require("../database/database_mysql_inventory_operations")

const { verify_token } = require("../middlewares/authToken");

app.get('/api/inventario/lista', verify_token, async function(req, res) {
    try {
        const inventory = await get_inventory_devices_general();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});

app.get('/api/inventario/Institucion/asignado/:codigo', verify_token, async function(req, res) {
    try {
        const inventory = await get_inventory_assigned_institution(req.params.codigo);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});

app.get('/api/inventario/institution/instalados/:codigo', verify_token, async function(req, res, next) {
    try {
        const inven_institu = await get_inventory_device_institution_from_code(req.params.codigo);
        res.json(inven_institu);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});

app.get('/api/inventario/stock/:cartel', verify_token, async function(req, res, next) {
    try {
        const inven_stock = await get_inventory_in_stock(req.params.cartel);
        res.json(inven_stock);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    
});  

app.get('/api/ce/rededucativa/:codigo', verify_token, async function(req, res, next) {
    try {
        const ce = await get_information_RedEducativa_from_code(req.params.codigo);
        res.json(ce);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    

});

app.get('/api/carteles/', verify_token, async function(req, res, next) {
    try {
        const inven_stock = await get_id_carteles();
        res.json(inven_stock);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
});

app.get('/api/ce/informacion/:codigo', verify_token, async function(req, res, next) {
    try {
        const info_ce = await get_information_centroeducativo_from_code(req.params.codigo);
        res.json(info_ce);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
});

app.get('/api/device/dashboard/:name', async function(req, res, next) {
    try {
        const devices_count = await get_brand_devices_in_dashboard(req.params.name);
        res.json(devices_count);
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
        });
    }
    

});

module.exports = app;