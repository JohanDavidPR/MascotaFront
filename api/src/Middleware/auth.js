const {verifyToken} = require('../Helpers/generateToken');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop() // Obtener la parte del token 
        if( !token ){
            res.status(400).json({
                msg: 'token incorrecto o caducado',
                err: 'wrong or expired token',
                status: "error",
                data: {}
            })
        }
        const tokenData = await verifyToken(token);
        if(tokenData._id){
            next();
        } else {
            res.status(401).json({
                msg: 'token incorrecto o caducado',
                error: 'wrong or expired token', 
                status: "error",
                data: {}
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al autenticar el token',
            error: error,
            status: "error",
            data: {}
        })
    }
}

module.exports = {checkAuth}