//-------------------------------------------Operaciones con la Base de datos Equipos de Red Y seleccion del token del Sistema --------------------------------------//
const { getConection } = require("./database");


async function get_Device_List() {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM select_devices").catch(res => console.log("error " + res));
    return valor
}

async function get_Device_Serial(serial) {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM select_devices WHERE serial = ?", serial).catch(res => console.log("error " + res));
    return valor
}
async function get_Device_Codigo(codigo) {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM select_devices WHERE nombre  LIKE ?", '%' + codigo + '%').catch(res => console.log("error " + res));
    return valor
}
async function get_token(token) {
    const conn = await getConection();
    const valor = await conn.query("SELECT token_api_fod from token_api_fod WHERE token_api_fod = ?", token).catch(res => console.log("error " + res));
    return valor
}

async function get_Red_Template(codigo) {
    const conn = await getConection();
    const valor = await conn.query("SELECT nombretemplate FROM template WHERE codigoCe = ?", codigo).catch(res => console.log("error " + res));
    return valor
}
async function Get_Estado_Sistema() {
    const conn = await getConection();
    const valor = await conn.query("SELECT estado FROM estado_db_registros WHERE idActualizacion = 001").catch(res => console.log("error " + res));
    return valor[0].estado
}



module.exports = {
    get_Device_List,
    get_Device_Serial,
    get_Device_Codigo,
    get_token,
    get_Red_Template,
    Get_Estado_Sistema

}