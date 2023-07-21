const {
    send
} = require('../Helpers/Send');
const User = require('../Database/Models/User');
const {
    Op
} = require('sequelize')
const {
    encrypt,
    compare
} = require('../Helpers/handleBcrypt');
const { tokenSing } = require('../Helpers/generateToken');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        send(res, {
            msg: "Usuarios obtenidos correctamente",
            data: users
        });
    } catch (error) {
        console.log(error);
        send(res, {
            msg: "No se pudo obtener los datos",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

const getUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const user = await User.findByPk(id);
        send(res, {
            msg: "Usuario obtenido correctamente",
            data: user
        });
    } catch (error) {
        console.log(error);
        send(res, {
            msg: "No se pudo obtener el dato",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

const getUserDocument = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const user = await User.findOne({
            where: {
                identification_number: id
            }
        });
        send(res, {
            msg: "Usuario obtenido correctamente",
            data: user
        });
    } catch (error) {
        console.log(error);
        send(res, {
            msg: "No se pudo obtener el dato",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

const addUser = async (req, res) => {
    try {

        const {
            identification_number,
            name,
            last_name,
            email,
            username,
            password,
            phone_number
        } = req.body;

        const encryptedPassword = await encrypt(password);

        const user = await User.create({
            identification_number,
            name,
            last_name,
            email,
            username,
            password: encryptedPassword,
            phone_number,
            rol: 4
        });

        send(res, {
            msg: "Usuario agregado correctamente",
            data: user
        });

    } catch (error) {
        console.log(error);
        send(res, {
            msg: "No se pudo agregar los datos",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

const validateUser = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        console.log(username, password);

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        username: username
                    },
                    {
                        email: username
                    }
                ]
            }
        })

        if (user) {
            if (await compare(password, user.password)) {
                const  token = await tokenSing(user);
                send(res, {
                    msg: "Usuario validado correctamente",
                    data: {
                        id: user.id,
                        name: user.name,
                        last_name: user.last_name,
                        email: user.email,
                        username: user.username,
                        phone_number: user.phone_number,
                        rol: user.rol,
                        token: token
                    }
                });
                return;
            }
        }

        send(res, {
            msg: "Usuario o contraseña incorrectos",
            status: "error",
            codeStatus: 400
        });

    } catch (error) {
        console.log(error);
        send(res, {
            msg: "No se pudo validar el usuario",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

module.exports = {
    getUsers,
    getUser,
    getUserDocument,
    addUser,
    validateUser
}