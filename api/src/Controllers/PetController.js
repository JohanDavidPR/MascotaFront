const {
    send
} = require('../Helpers/Send');
const Pet = require('../Database/Models/Pet');
const { sendMessage } = require('../Helpers/writeToFileWithFormat');

const getPets = async (req, res) => {
    try {
        const pet = await Pet.findAll();
        send(res, {
            msg: "Mascotas obtenidas correctamente",
            data: pet
        })
    } catch (error) {
        console.log(error);
        sendMessage(error);
        send(res, {
            msg: "-------",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

const getPet = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findByPk(id);
        send(res, {
            msg: "Mascota obtenida correctamente",
            data: pet
        });
    } catch (error) {
        console.error(error);
        sendMessage(error);
        send(res, {
            msg: "-----------",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

const addPet = async (req, res) => {
    try {
        const {
            user_id,
            nombre,
            raza,
            edad,
            peso,
            genero
        } = req.body;

        const pet = await Pet.create({
            user_id,
            nombre,
            raza,
            edad,
            peso,
            genero
        });

        send(res, {
            msg: "Mascota agregada correctamente",
            data: pet
        });

    } catch (error) {
        console.error(error);
        sendMessage(error);
        send(res, {
            msg: "-----------",
            status: "error",
            error,
            codeStatus: 500
        });
    }
}

module.exports = {
    getPets,
    getPet,
    addPet
}