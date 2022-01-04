const { getConection } = require("../database/database");

async function get_token_dashboard(dashboard) {
    const conn = await getConection();
    const valor = await conn.query("SELECT token FROM token_access_dashboard WHERE nombre = ?", dashboard).catch(res => console.log("error " + res));
    if (valor.length > 0) {
        return valor[0].token.toString();
    } else {
        return "Token is not valid"
    }
}

module.exports = {
    get_token_dashboard
}