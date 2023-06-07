const express = require("express");
require("dotenv").config()
const APP = express();
const { get_name_centroeducativo_from_code } = require("../database/database_mysql_inventory_operations");
const { verify_token } = require("../middlewares/authToken");


APP.get('/', async function(req, res) {
    try {
        res.json({
            api_name: process.env.API_NAME,
            message: process.env.API_MESSAGE
    
        });
    } catch (error) {
        res.status(500).json({
            "Message": "Error "+error,
        });
    }
    
});
APP.get('/api/institucion/:codigoCE', verify_token, async function(req, res) {
    try {
        const CE = await get_name_centroeducativo_from_code(req.params.codigoCE);
        res.json(CE);
    } catch (error) {
        res.status(500).json({
            "Message": "Error "+error,
        });
    }
    
});

APP.use(require(process.env.API_ROUTES_DEVICES));
APP.use(require(process.env.API_ROUTES_INVENTORY));
APP.use(require(process.env.API_ROUTES_ACEPTACIONES));
APP.use(require(process.env.API_ROUTES_TOOLS));
APP.use(require(process.env.API_ROUTES_MAIL));
APP.use(require(process.env.API_ROUTES_REGISTER_INFORMATION));


module.exports = APP;