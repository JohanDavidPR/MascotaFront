const { send } = require('../Helpers/Send');
const Rol = require('../Database/Models/Rol');

const getRoles = async (req, res) => {
    try{
        const roles = await Rol.findAll();
        send(res, {
            msg: "Roles obtenidos correctamente",
            data: roles
        });
    }
    catch(error){
        console.log(error);
        send(res, {
            msg: "No se pudo obtener los datos",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

module.exports = {
    getRoles
}