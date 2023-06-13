require("dotenv").config()
const nodemailer = require("nodemailer")

async function get_mail_transporter() {
    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        }

    });
    return transporter;
}

function get_mail_body_formater(name_centroeducativo, code, status, cartel, description, tecnico, date) {
    var data_mail_format = `<html> <body>  <h5>Nombre del Centro Educativo: ${name_centroeducativo} ( ${code} )</h5>" +
                            "<h5>Estado de Aceptación: ${status} </h5>" +
                            "<h5>Cartel: ${cartel} </h5>" +
                            "<h5>Descripcion: <br> ${description} </h5>" +
                            "<h5>Nombre del Tecnico: ${tecnico}  </h5>" +
                            "<h5>Fecha de Aceptación: ${date}  </h5>" +
                            "<img src='http://52.224.181.86/images/aceptacionesRed.jpg'/>" +
                            "</body>" +
                            "</html>`
    return data_mail_format;
}

function get_mail_options(to, cc1, cc2, data, name_centroeducativo, code) {
    var mail_options = {
        from: process.env.MAIL_FROM,
        to: to,
        cc: [cc1, cc2],
        subject: `Aceptación de Red ${name_centroeducativo} ( ${code} )`,
        html: data
    }
    return mail_options;
}

module.exports = {
    get_mail_transporter,
    get_mail_body_formater,
    get_mail_options
}