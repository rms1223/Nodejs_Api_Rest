const express = require("express");
const app = express();
const { verify_token } = require("../middlewares/authToken");
const { Request_session, ToolPing } = require('../libs/request_aruba')

app.get('/api/tools/aruba/ping/:serie/:ip',verify_token,async function(req, res, error) {
    try {
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
    } catch (error) {
        res.status(500).json({ "Message: ": error });
    }
});

module.exports = app;