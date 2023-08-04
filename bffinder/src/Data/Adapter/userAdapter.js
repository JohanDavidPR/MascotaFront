export const sendUser = (user) => {
    return {
        identification_number: user.identification_number,
        username: user.username,
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

export const sendPet = (pet) => {
    return {
        user_id: pet.propietario,
        nombre: pet.nombre,
        raza: pet.raza,
        edad: pet.edad,
        peso: pet.peso,
        genero: pet.genero
    }
}

export const recibePet = (pet) => {
    return {
        propietario: pet.user_id,
        nombre: pet.nombre,
        raza: pet.raza,
        edad: pet.edad,
        peso: pet.peso,
        genero: pet.genero
    }
}