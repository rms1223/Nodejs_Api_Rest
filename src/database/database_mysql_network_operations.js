require("dotenv").config()
const { get_mysql_connection_network } = require("../config/connection_mysql_database_network");

async function get_devices_list_in_database() {
    const mysql_connection = await get_mysql_connection_network();
    const response_query = await mysql_connection.query(process.env.MYSQL_NETWORK_QUERY_ALLDEVICES).catch(res => console.log("error " + res));
    return response_query
}

async function get_information_device_from_serial(serial) {
    const mysql_connection = await get_mysql_connection_network();
    const response_query = await mysql_connection.query(process.env.MYSQL_NETWORK_QUERY_INFROMATION_DEVICE_FROM_SERIAL, serial).catch(res => console.log("error " + res));
    return response_query
}
async function get_devices_in_database_from_code(code) {
    const mysql_connection = await get_mysql_connection_network();
    const response_query = await mysql_connection.query(process.env.MYSQL_NETWORK_QUERY_ALLDEVICES_FROM_NAME, '%' + code + '%').catch(res => console.log("error " + res));
    return response_query
}
async function get_token_api_dashboard(token) {
    const mysql_connection = await get_mysql_connection_network();
    const response_query = await mysql_connection.query(process.env.MYSQL_NETWORK_QUERY_TOKEN, token).catch(res => console.log("error " + res));
    return response_query
}

async function get_template_name_from_code(code) {
    const mysql_connection = await get_mysql_connection_network();
    const response_query = await mysql_connection.query(process.env.MYSQL_NETWORK_QUERY_TEMPLATE_NAME, code).catch(res => console.log("error " + res));
    return response_query
}
async function get_system_status() {
    const mysql_connection = await get_mysql_connection_network();
    const response_query = await mysql_connection.query(process.env.MYSQL_NETWORK_QUERY_STATUS_REGISTER).catch(res => console.log("error " + res));
    return response_query[0].estado
}
async function get_total_device_in_dashboard() {
    const mysql_connection = await get_mysql_connection_network();
    const response_query = await mysql_connection.query(process.env.MYSQL_NETWORK_QUERY_INFORMATION_IN_DASHBOARD).catch(res => console.log("error " + res));
    return response_query
}


module.exports = {
    get_devices_list_in_database,
    get_information_device_from_serial,
    get_devices_in_database_from_code,
    get_token_api_dashboard,
    get_template_name_from_code,
    get_system_status,
    get_total_device_in_dashboard

}