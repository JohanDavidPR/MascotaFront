import axios from "axios";
import { API_URL } from "../../Helpers/Const";
import { sendPet, recibePet } from "../Adapter/userAdapter";

export const addPet = async (petData) => {
    try {
        return (await axios.post(API_URL + "pet", sendPet(petData))).data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getPets = async () => {
    try {
        const pets = (await axios.get(API_URL + "pets")).data.data;
        console.log(pets);
        return pets.map(pet => recibePet(pet));
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getPet = async () => {
    try {
        const pet = (await axios.get(API_URL + "pet")).data;
        return recibePet(pet);
    } catch (error) {
        console.log(error);
        return null;
    }
}