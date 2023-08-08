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