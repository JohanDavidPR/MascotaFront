/* eslint-disable no-unreachable */
import axios from "axios";
import { API_URL } from "../../Helpers/Const";
import { recibeUser, sendUser } from "../Adapter/userAdapter";

export const register = async (userData) => {
    try {
        return (await axios.post(API_URL + "user", sendUser(userData))).data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const login = async (credentials) => {
    try {
        const user = await axios.post(API_URL + "user/login", credentials);
        const userFormatted = recibeUser(user.data.data);
        localStorage.setItem("user", JSON.stringify(userFormatted));
        return userFormatted;
    }
    catch (error) {
        console.log(error);
        return {};
    }
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

