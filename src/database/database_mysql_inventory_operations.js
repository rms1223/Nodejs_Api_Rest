const { get_mysql_connection_inventory } = require("../config/connection_mysql_database_inventory");
async function get_inventory_devices_general() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT * FROM buscar_inventario_general").catch(res => console.log("error " + res));
    return response_query
}
async function get_inventory_assigned_institution(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT * FROM buscar_equipos_asignados_instituciones WHERE Codigo = ?", code).catch(res => console.log("error " + res));
    return response_query
}
async function get_inventory_device_institution_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT * FROM buscar_inventario_en_institucion WHERE Codigo = ?", code).catch(res => console.log("error " + res));
    return response_query
}
async function get_inventory_in_stock(cartel) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT * FROM buscar_inventario_en_stock WHERE Cartel = ?", cartel).catch(res => console.log("error " + res));
    return response_query
}
async function get_information_RedEducativa_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const valor = await mysql_connection.query("select * from buscar_ce_rede_ducativa where codigo_ce = ?", code).catch(res => console.log("error " + res));
    return valor
}
async function get_general_status_aceptaciones() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT * FROM view_estado_aceptaciones").catch(res => console.log("error " + res));
    return response_query
}
async function get_status_aceptaciones_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT * FROM view_estado_aceptaciones where Centro_Educativo = ?", code).catch(res => console.log("error " + res));
    return response_query
}
async function get_name_centroeducativo_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT centro_educativo FROM sistema_fod_cableado.instituciones where codigo = ?", code).catch(res => console.log("error " + res));
    return response_query
}
async function save_status_aceptaciones(idCartel, id_centroEducativo, estado, descripcion, fecha) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("INSERT INTO estado_aceptaciones SET ?", { idCartel, id_centroEducativo, estado, descripcion, fecha }).catch(res => console.log("error " + res));
    return response_query
}
async function get_id_carteles() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("select id_cartel from carteles").catch(res => console.log("error " + res));
    return response_query
}
async function get_brand_devices_in_dashboard(name) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("select * from sistema_fod_cableado.view_cantidadequiposdashboard WHERE marca = ?", name).catch(res => console.log("error " + res));
    return response_query
}
async function get_information_centroeducativo_from_code(code) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT distinct(informacion.id_categoria), informacion.codigo_institucion,insti.centro_educativo,ubicacion.provincia,ubicacion.distrito,ubicacion.canton " +
        "FROM distribucion_categoria as informacion " +
        "INNER JOIN institucion_ubicacion as ubicacion ON ubicacion.codigo = informacion.codigo_institucion " +
        "INNER JOIN instituciones as insti ON insti.codigo =  informacion.codigo_institucion  where codigo_institucion = ? ", code).catch(res => console.log("error " + res));
    return response_query
}
async function save_control_visit_in_centroeducativo(cartel, codigo, tecnico, fecha) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("INSERT INTO registrovisitascontrol SET ?", { codigo, cartel, tecnico, fecha }).catch(res => console.log("error " + res));
    return response_query
}
async function save_changes_password_in_networks(code, name, cartel, descripcion, date, dashboard) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("INSERT INTO cambioscontrasena SET ?", { codigo: code, nombrece: name, cartel, descripcion, fecha: date, dashboard }).catch(res => console.log("error " + res));
    return response_query
}
async function get_changes_password_in_networks() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT * FROM view_cambiosredce").catch(res => console.log("error " + res));
    return response_query
}
async function get_control_visit_in_centroeducativo() {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT * FROM view_visitascontrol").catch(res => console.log("error " + res));
    return response_query
}
async function get_total_devices_in_centroeducativo_from_cartel(cartel) {
    const mysql_connection = await get_mysql_connection_inventory();
    const response_query = await mysql_connection.query("SELECT totalce FROM sistema_fod_cableado.totalcentrosedcautivoscartel WHERE idcartel = ? ", cartel).catch(res => console.log("error " + res));
    return response_query
}
async function get_total_aceptaciones_from_cartel(cartel) {
    const mysql_connection = await get_mysql_connection_inventory();
    let estado ="ACEPTADO";
    const response_query = await mysql_connection.query("SELECT COUNT(distinct(Centro_Educativo)) as totalce FROM sistema_fod_cableado.view_estado_aceptaciones WHERE Cartel = ? AND Estado =?",[cartel,estado]).catch(res => console.log("error " + res));
    return response_query
}
async function get_total_no_aceptaciones_from_cartel(cartel) {
    const mysql_connection = await get_mysql_connection_inventory();
    let estado ="NO ACEPTADO";
    const response_query = await mysql_connection.query("SELECT COUNT(distinct(Centro_Educativo)) as totalce FROM sistema_fod_cableado.view_estado_aceptaciones WHERE Cartel = ? AND Estado =?", [cartel,estado]).catch(res => console.log("error " + res));
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