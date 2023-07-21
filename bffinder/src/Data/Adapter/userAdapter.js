export const sendUser = (user) => {
    return {
        identification_number: user.identification_number,
        name: user.firstname,
        last_name: user.lastname,
        email: user.email,
        password: user.password,
        phone_number: ""
    };
}

export const recibeUser = (user) => {
    return {
        identification_number: user.identification_number,
        firstname: user.name,
        lastname: user.last_name,
        email: user.email,
        token: user.token,
        phone_number: user.phone_number,
        rol: user.rol
    }
}