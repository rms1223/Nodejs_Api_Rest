const AXIOS = require('axios');
const { get_token_dashboard } = require('../libs/arubatools');
require("dotenv").config()


const get_token_aruba_dashboard = async() => {
    let token = await get_token_dashboard(process.env.ARUBA_DASHBOARD_NAME);
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "bearer " + token
    }

    return headers;
}

const get_gateways_in_arubacentral = async() => {

    let header = await get_token_aruba_dashboard();
    return await AXIOS.get(process.env.PATH_ARUBA_GATEWAYS, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}


const process_aruba_tool_ping = async(serie, ip) => {
    let header = await get_token_aruba_dashboard();
    const data = {
        'device_type': 'CONTROLLER',
        'commands': [{
            'command_id': 2369,
            'arguments': [{
                'name': 'Host',
                'value': ip
            }]
        }]
    }
    return await AXIOS.post( process.env.PATH_ARUBA_TOOLS+ serie, data, {
            headers: header
        })
        .then(response => {
            return response.data.session_id;
        })
        .catch((error) => {
            return error.response.data;
        });
}


const get_request_session = async(serie, session_id) => {
    let header = await get_token_aruba_dashboard();
    const params = new URLSearchParams([
        ['session_id', session_id]
    ]);

    return await AXIOS.get(process.env.PATH_ARUBA_TOOLS + serie, {
            headers: header,
            params
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}


module.exports = {
    Request_session: get_request_session,
    ToolPing: process_aruba_tool_ping,
    Get_Devices_Gateways: get_gateways_in_arubacentral
}