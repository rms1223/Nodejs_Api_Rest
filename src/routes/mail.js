const express = require("express");
const app = express();
const { verify_token } = require("../middlewares/authToken");
const { save_status_aceptaciones } = require("../database/database_mysql_inventory_operations")
const { get_mail_transporter, get_mail_body_formater, get_mail_options } = require("../config/connection_datamail");

app.post('/api/sendmail/', verify_token, async function(req, res) {
    try {
        let request = await save_status_aceptaciones(req.body.cartel, req.body.codigo, req.body.estado, req.body.data, req.body.fecha)
        let data = get_mail_body_formater(req.body.ce, req.body.codigo, req.body.estado, req.body.cartel, req.body.data, req.body.tecnico, req.body.fecha)
        let mailOptions = get_mail_options("randy.montoya@fod.ac.cr","",req.body.cc, data, req.body.ce, req.body.codigo)
        const transporter = get_mail_transporter();
        (await transporter).sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.status(200).json({
                    "Message": req.body
                });
            }
        });
        res.status(200).json({
            "Message": "Correo Enviado",
        });
    } catch (error) {
        res.status(500).json({
            "Message": "Error "+error,
        });
    }
    
});

module.exports = app;