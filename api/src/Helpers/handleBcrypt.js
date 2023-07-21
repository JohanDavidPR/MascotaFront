const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports = {
    encrypt,
    compare
}