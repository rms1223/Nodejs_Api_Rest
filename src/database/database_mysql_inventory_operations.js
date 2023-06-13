const { get_mysql_connection_inventory } = require("../config/connection_mysql_database_inventory");
const Query = require("../config/path_mysql_query")
async function get_inventory_devices_general() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_ALL_GENERAL_iNVENTORY).catch(res => console.log("error " + res));
    return response_query
}
async function get_inventory_assigned_institution(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_SEARCH_DEVICES_ASSIGNED, code).catch(res => console.log("error " + res));
    return response_query
}
async function get_inventory_device_institution_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_DEVICES_FROM_CODE_IN_CENTROEDUCATIVO, code).catch(res => console.log("error " + res));
    return response_query
}
async function get_inventory_in_stock(cartel) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_DEVICES_IN_STOCK, cartel).catch(res => console.log("error " + res));
    return response_query
}
async function get_information_RedEducativa_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const valor = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_INFORMATION_REDEDUCATIVA, code).catch(res => console.log("error " + res));
    return valor
}
async function get_general_status_aceptaciones() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_ALL_VIEW_STATUS_ACCEPTANCES).catch(res => console.log("error " + res));
    return response_query
}
async function get_status_aceptaciones_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_VIEW_STATUS_ACCEPTANCES_FROM_CODE, code).catch(res => console.log("error " + res));
    return response_query
}
async function get_name_centroeducativo_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_NAME_CENTROEDUCATIVO, code).catch(res => console.log("error " + res));
    return response_query
}
async function save_status_aceptaciones(idCartel, id_centroEducativo, estado, descripcion, fecha) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_INSERT_STATUS_ACCEPTANCES, { idCartel, id_centroEducativo, estado, descripcion, fecha }).catch(res => console.log("error " + res));
    return response_query
}
async function get_id_carteles() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_GET_IDCARTEL).catch(res => console.log("error " + res));
    return response_query
}
async function get_brand_devices_in_dashboard(name) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_GET_BRAND_DEVICE, name).catch(res => console.log("error " + res));
    return response_query
}
async function get_information_centroeducativo_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_GET_INFORMATION_CENTROEDUCATIVO, code).catch(res => console.log("error " + res));
    return response_query
}
async function save_control_visit_in_centroeducativo(cartel, codigo, tecnico, fecha) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_INSERT_VISITS_CONTROL, { codigo, cartel, tecnico, fecha }).catch(res => console.log("error " + res));
    return response_query
}
async function save_changes_password_in_networks(code, name, cartel, descripcion, date, dashboard) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_INSERT_PASSWORD_CHANGE, { codigo: code, nombrece: name, cartel, descripcion, fecha: date, dashboard }).catch(res => console.log("error " + res));
    return response_query
}
async function get_changes_password_in_networks() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_GET_PASSWORD_CHANGE).catch(res => console.log("error " + res));
    return response_query
}
async function get_control_visit_in_centroeducativo() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_GET_VISITS_CONTROL).catch(res => console.log("error " + res));
    return response_query
}
async function get_total_devices_in_centroeducativo_from_cartel(cartel) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_GET_TOTAL_DEVICES_FROM_CARTEL, cartel).catch(res => console.log("error " + res));
    return response_query
}
async function get_total_aceptaciones_from_cartel(cartel) {
    const mysql_connection = await get_mysql_connection_inventory();
    let estado ="ACEPTADO";
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_GET_TOTAL_ACCEPTANCES_FROM_CARTEL,[cartel,estado]).catch(res => console.log("error " + res));
    return response_query
}
async function get_total_no_aceptaciones_from_cartel(cartel) {
    const mysql_connection = await get_mysql_connection_inventory();
    let estado ="NO ACEPTADO";
    const response_query = await mysql_connection.query(Query.MYSQL_INVENTORY_QUERY_GET_TOTAL_ACCEPTANCES_FROM_CARTEL, [cartel,estado]).catch(res => console.log("error " + res));
    return response_query
}
module.exports = {
    get_inventory_devices_general,
    get_inventory_device_institution_from_code,
    get_inventory_in_stock,
    get_inventory_assigned_institution,
    get_general_status_aceptaciones,
    get_status_aceptaciones_from_code,
    get_name_centroeducativo_from_code,
    save_status_aceptaciones,
    get_id_carteles,
    get_information_RedEducativa_from_code,
    get_information_centroeducativo_from_code,
    get_brand_devices_in_dashboard,
    save_control_visit_in_centroeducativo,
    save_changes_password_in_networks,
    get_changes_password_in_networks,
    get_control_visit_in_centroeducativo,
    get_total_devices_in_centroeducativo_from_cartel,
    get_total_aceptaciones_from_cartel,
    get_total_no_aceptaciones_from_cartel

}