//-------------------------------------------Operaciones con la Base de datos Equipos de Red Mongo Db --------------------------------------//
const { getConection } = require("./databaseMongo");
request_data = []

async function Get_Devices(codigo) {
    const con = await getConection();
    const devices = con.collection("devices");
    const result = await devices.aggregate([
        { $match: { 'name': { '$regex': '.*' + codigo + '.*' } } },
        {
            $lookup: {
                from: 'devices_status',
                localField: 'serial',
                foreignField: 'serial_equipo',
                as: 'estado_dispositivos'
            }
        },
        { "$unwind": "$estado_dispositivos" }
    ]).toArray();
    return result;
}
async function Get_Clients_Network(codigo) {
    const con = await getConection();
    const clients_networks = con.collection("clients_in_networks");
    const result = await clients_networks.find({ 'codigo': codigo }).toArray();
    return result;
}

async function Get_Network_Template(codigo) {
    try {
        const con = await getConection();
        const networks = con.collection("network_devices");
        const template = con.collection("template");
        const request_network = await networks.findOne({ 'codigo': codigo });
        let result = ""
        if (request_network["id_template"] != "No especificado") {
            let valor = await template.find({ 'id': request_network["id_template"] }).toArray();
            result = valor[0].name;
        } else {
            result = request_network["id_template"];
        }
        return result;
    } catch (exception) {
        return "......"
    }

}
module.exports = {
    Get_Devices,
    Get_Clients_Network,
    Get_Network_Template
}