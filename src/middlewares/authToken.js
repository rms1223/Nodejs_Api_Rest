require("dotenv").config()

const { get_token_api_dashboard } = require('../database/database_mysql_network_operations')

const verify_token = async(req, res, next) => {
    let token = req.headers[process.env.API_NAME_HEADER_TOKEN];
    if (!token) return res.status(403).json({ message: "No token provided " })
    try {
        const query_token = await get_token_api_dashboard(token);
        if (query_token[0].token_api_fod != token) return res.status(404).json({ message: "No token valid...." });
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized Token" })
    }

}

module.exports = {
    verify_token
}