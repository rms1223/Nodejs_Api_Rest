//-------------------------------------------Operaciones con la Base de datos Invemtarios --------------------------------------//
const { getConection } = require("./databaseInventario");

async function get_Inventory_General() {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM buscar_inventario_general").catch(res => console.log("error " + res));
    return valor
}

async function get_Inventory_Assigned_Institution(codigo) {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM buscar_equipos_asignados_instituciones WHERE Codigo = ?", codigo).catch(res => console.log("error " + res));
    return valor
}

async function get_Inventory_Institution(codigo) {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM buscar_inventario_en_institucion WHERE Codigo = ?", codigo).catch(res => console.log("error " + res));
    return valor
}
async function get_Inventory_Stock(cartel) {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM buscar_inventario_en_stock WHERE Cartel = ?", cartel).catch(res => console.log("error " + res));
    return valor
}
//Buscar CE en BD para la red educativa
async function get_CE_RedEducativa(codigo) {
    const conn = await getConection();
    const valor = await conn.query("select * from buscar_ce_rede_ducativa where codigo_ce = ?", codigo).catch(res => console.log("error " + res));
    return valor
}
//Retorna estado general de aceptaciones
async function get_Aceptaciones_General() {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM view_estado_aceptaciones").catch(res => console.log("error " + res));
    return valor
}

//Retorna estado general de aceptaciones por centro educativo
async function get_Aceptaciones_CE(codigo) {
    const conn = await getConection();
    const valor = await conn.query("SELECT * FROM view_estado_aceptaciones where Centro_Educativo = ?", codigo).catch(res => console.log("error " + res));
    return valor
}
//view_estado_aceptaciones

//Obtener Nombre del CE
async function get_Nombre_CE(codigo) {
    const conn = await getConection();
    const valor = await conn.query("SELECT centro_educativo FROM sistema_fod_cableado.instituciones where codigo = ?", codigo).catch(res => console.log("error " + res));
    return valor
}
async function set_Aceptaciones_CE(idCartel, id_centroEducativo, estado, descripcion, fecha) {
    const conn = await getConection();
    const valor = await conn.query("INSERT INTO estado_aceptaciones SET ?", { idCartel, id_centroEducativo, estado, descripcion, fecha }).catch(res => console.log("error " + res));
    return valor
}
async function get_Id_Carteles() {
    const conn = await getConection();
    const valor = await conn.query("select id_cartel from carteles").catch(res => console.log("error " + res));
    return valor
}
async function get_CE_Informacion(codigo) {
    const conn = await getConection();
    const valor = await conn.query("SELECT distinct(informacion.id_categoria), informacion.codigo_institucion,insti.centro_educativo,ubicacion.provincia,ubicacion.distrito,ubicacion.canton " +
        "FROM distribucion_categoria as informacion " +
        "INNER JOIN institucion_ubicacion as ubicacion ON ubicacion.codigo = informacion.codigo_institucion " +
        "INNER JOIN instituciones as insti ON insti.codigo =  informacion.codigo_institucion  where codigo_institucion = ? ", codigo).catch(res => console.log("error " + res));
    return valor
}
module.exports = {
    get_Inventory_General,
    get_Inventory_Institution,
    get_Inventory_Stock,
    get_Inventory_Assigned_Institution,
    get_Aceptaciones_General,
    get_Aceptaciones_CE,
    get_Nombre_CE,
    set_Aceptaciones_CE,
    get_Id_Carteles,
    get_CE_RedEducativa,
    get_CE_Informacion
}