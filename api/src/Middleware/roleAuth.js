const {getTokenData} = require('../Helpers/generateToken');

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const tokenData = await getTokenData(req.headers.authorization);

        // const userData = await prisma.User.findUnique({where: {identification_number: tokenData._id}})
        // req.role_user = userData.role
        // const roleUser = await prisma.Role.findUnique({where: {id: userData.role}})
        const role = "";
        if([].concat(roles).includes(role)){
            next();
        } else {
            res.status(401).json({
                msg: 'El usuario no tiene permitido ingresar',
                err: 'The user does not have the required permissions',
                status: "error",
                data: {}
            })//wrong or expired token
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al validar el rol',
            err: error,
            status: "error",
            data: {}
        })
    }
} 

const checkStatus = (statusList) => async (req, res, next) => {
    try {
        const tokenData = await getTokenData(req.headers.authorization);
        // const userData = await prisma.User.findUnique({where: {identification_number: tokenData._id}})
        // req.id_usuario = tokenData._id;
        const userData = {status: ""};
        if([].concat(statusList).includes(userData.status)){
            next();
        } else {
            res.status(401).json({
                msg: 'El usuario no se encuentra activo',
                err: 'The user is not active in the system',
                status: "error",
                data: {}
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al validar el estado',
            err: error,
            status: "error",
            data: {}
        })
    }
}

module.exports = {checkRoleAuth, checkStatus}