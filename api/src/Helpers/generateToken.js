const jwt = require('jsonwebtoken');

const  tokenSing = async (user) => {
    return jwt.sign(
        {
            _id: user.identification_number,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    )
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

const getTokenData = async (authorization) => {
    try{
        const token = authorization.split(' ').pop() // Obtener la parte del token 
        const tokenData = await verifyToken(token);
        return tokenData;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

module.exports = {
    tokenSing,
    verifyToken,
    getTokenData
}