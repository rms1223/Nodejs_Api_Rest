const express = require("express");
const app = express();
//----------------------------------------------------------------Ruta por defecto para el API----------------------------------------------------//
app.get('/', async function(req, res) {
    res.json({
        api_name: "WEB API FOD ver-1.0.0",
        message: "Para hacer uso debe generar el token"

    });
});

app.use(require("./devices"));
app.use(require("./inventario"));
app.use(require("./aceptaciones"));
app.use(require("./tools"));

module.exports = app;