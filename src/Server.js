require("dotenv").config();
const express = require('express');
const cors = require("cors");
const Route = require("./config/path_api_routes")


const app = express();
app.set('port', process.env.Port || 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require(Route.API_ROUTES_DEFAULT));

app.listen(app.get("port"), (err) => {
    try {
        if (err) {
            console.log("Error al Iniciar el Puerto" + err);
        }
        console.log("Servidor Iniciado en el Puerto " + app.get("port"));
    } catch (error) {
        res.status(500).json({
            "Message": `Error ${error}`,
            
        });
    }
    
});