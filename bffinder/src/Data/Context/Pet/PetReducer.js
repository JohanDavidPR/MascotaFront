import {
    GET_PETS,
    ADD_PET,
    ERROR,
    LOADING
} from '../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const {payload, type} = action
    switch(type){
        case GET_PETS:
            return {
                ...state,
                error: false,
                loading: false,
                pets: payload
            }
        case ADD_PET:
            return {
                ...state,
                error: false,
                loading: false,
                pets: [...state.pets, payload]
            }
        case ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: payload
            }
        default:
            return state;
    }
}