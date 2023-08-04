import React, {useReducer} from 'react'

import PetContext from './PetContext';
import PetReducer from './PetReducer'

import { getPets, addPet } from '../../Services/petService';

const PetState = (props) => {
    const inicialState = {
        pets: [],
        loading: false,
        error: false,
    }

    const [state, dispatch] = useReducer(PetReducer, inicialState);

    const getPetsState = async () => {
        try {
            dispatch({
                type: 'LOADING',
                payload: true
            })
            const data = await getPets();
            dispatch({
                type: 'GET_PETS',
                payload: data
            })
        } catch (error) {
            console.log(error);
            
            dispatch({
                type: 'ERROR',
                payload: true
            })
        }
    }

    const addPetState = async (petData) => {
        try {
            dispatch({
                type: 'LOADING',
                payload: true
            })
            const response = await addPet(petData);
            const data = response.data;
            dispatch({
                type: 'ADD_PET',
                payload: data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ERROR',
                payload: true
            })
        }
    }
    
    return (
        <PetContext.Provider value={{
            pets: state.pets,
            getPets: getPetsState,
            addPet: addPetState
        }}>
            {props.children}
        </PetContext.Provider>
    )
}

export default PetState;