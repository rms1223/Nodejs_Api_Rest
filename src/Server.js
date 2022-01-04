const express = require('express');
const cors = require("cors")

const app = express();
app.set('port', process.env.Port || 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes/default"));

app.timeout = 0;
app.listen(app.get("port"), (error) => {
    if (error) {
        console.log("Error al Ejecutar el Servidor ");
    }

});