const Query = require("../config/path_mysql_query")
const { get_mysql_connection_network } = require("../config/connection_mysql_database_network");

async function get_token_dashboard_aruba(dashboard) {
    const conn = await get_mysql_connection_network();
    const valor = await conn.query(Query.MYSQL_NETWORK_QUERY_ARUBA_TOKEN, dashboard).catch(res => console.log("error " + res));
    if (valor.length > 0) {
        return valor[0].token.toString();
    } else {
        return "Token is not valid"
    }
}

module.exports = {
    get_token_dashboard: get_token_dashboard_aruba
}