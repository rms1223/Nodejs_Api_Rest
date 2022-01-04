const axios = require('axios');
const { get_token_dashboard } = require('./aruba_token');



//-------------------------------------------Metodo para enviar peticion Post ARUBA Central --------------------------------------//
const Get_Token_Aruba = async() => {
    let token = await get_token_dashboard("ARUBA");
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "bearer " + token
    }

    return headers;
}


//-------------------------------------------Metodo para obtener Gateway en el Central ------------------------------------------//
const Get_Devices_Gateways = async() => {

    let header = await Get_Token_Aruba();
    return await axios.get('https://apigw-prod2.central.arubanetworks.com/monitoring/v1/gateways', {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

//-------------------------------------------Metodo para enviar Ping a los Gateways --------------------------------------------//
const ToolPing = async(serie, ip) => {
    let header = await Get_Token_Aruba();
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
    return await axios.post('https://apigw-prod2.central.arubanetworks.com/troubleshooting/v1/devices/' + serie, data, {
            headers: header
        })
        .then(response => {
            return response.data.session_id;
        })
        .catch((error) => {
            return error.response.data;
        });
}

//-------------------------------------------Metodo para enviar Ping a los Switch --------------------------------------------//
const ToolPingSwitch = async(serie, ip) => {
    let header = await Get_Token_Aruba();
    const data = {
        'device_type': 'SWITCH',
        'commands': [{
            'command_id': 1004,
            /*'arguments': [{
                'name': 'Host',
                'value': ip
            }]*/
        }]
    }
    return await axios.post('https://apigw-prod2.central.arubanetworks.com/troubleshooting/v1/devices/' + serie, data, {
            headers: header
        })
        .then(response => {
            return response.data.session_id;
        })
        .catch((error) => {
            return error.response.data;
        });
}

//-------------------------------------------Metodo para obtener el resuktado de una sesion central Aruba --------------------------------------------//
const Request_session = async(serie, session_id) => {
    let header = await Get_Token_Aruba();
    const params = new URLSearchParams([
        ['session_id', session_id]
    ]);

    return await axios.get('https://apigw-prod2.central.arubanetworks.com/troubleshooting/v1/devices/' + serie, {
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
    Request_session,
    ToolPing,
    ToolPingSwitch,
    Get_Devices_Gateways
}