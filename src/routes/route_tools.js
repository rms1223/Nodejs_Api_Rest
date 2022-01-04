const express = require("express");
const app = express();
const { verifyToken } = require("../middlewares/authentication_token");
const { Request_session, ToolPing, ToolPingSwitch } = require('../libs/request_aruba_tools')

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

//----------------------------------------------------------------Realizar Ping del Dispositivo Gateways Aruba Central APi--------------------------------------------------//
app.get('/api/tools/aruba/ping/:serie/:ip', verifyToken, async function(req, res, error) {
    const serie = req.params.serie;
    const ip = req.params.ip;
    let session_Id = await ToolPing(serie, ip);
    if (session_Id.description != undefined) {
        let val_request = {
            "hostname": "Error de Dispositivo",
            "output": "El dispositivo no se encuentra conectado con Aruba Central\n\n" + session_Id.description,
            "serial": serie,
            "status": "COMPLETED"
        }
        res.json(val_request);
    } else {
        let val_request = await Request_session(serie, session_Id);
        while (val_request.status == "RUNNING") {
            val_request = await Request_session(serie, session_Id);
        }
        res.json(val_request)
    }
});

//----------------------------------------------------------------Realizar Ping del Dispositivo Switch Aruba Central APi--------------------------------------------------//
app.get('/api/tools/aruba/ping/switch/:serie/:ip', verifyToken, async function(req, res, error) {
    const serie = req.params.serie;
    const ip = req.params.ip;
    let session_Id = await ToolPingSwitch(serie, ip);
    console.log(session_Id)
    if (session_Id.description != undefined) {
        let val_request = {
            "hostname": "Error de Dispositivo",
            "output": "El dispositivo no se encuentra conectado con Aruba Central\n\n" + session_Id.description,
            "serial": serie,
            "status": "COMPLETED"
        }
        res.json(val_request);
    } else {
        let val_request = await Request_session(serie, session_Id);

        while (val_request.status == "RUNNING") {
            val_request = await Request_session(serie, session_Id);
            console.log(val_request)
            await sleep(40000)
        }
        console.log(val_request)
        res.json(val_request)
    }
});

module.exports = app;