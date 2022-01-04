//-------------------------------------------Metodo para verificar el token de Authenticacion --------------------------------------------//
const { get_token } = require('../database/operacionesBaseDatosEquipos')

const verifyToken = async(req, res, next) => {
    let token = req.headers['x-fod-api-key'];
    if (!token) return res.status(403).json({ message: "No token provided.........." })

    try {
        const query_token = await get_token(token);
        if (query_token[0].token_api_fod != token) return res.status(404).json({ message: "No token valid.........." });
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized.........." })
    }

}

module.exports = {
    verifyToken
}