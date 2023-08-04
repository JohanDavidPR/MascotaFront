import React, {useState, useContext, useEffect} from 'react'
import '../../styles/PetCard/pets.css';

import PetContext from '../../Data/Context/Pet/PetContext';
import PetCard from '../Components/PetCard/index';

export default function Pets() {

    const petContext = useContext(PetContext);
    const {pets, getPets} = petContext;

    useEffect(() => {
        getPets();
    }, [])

  return (
    <div className='cont-card-pet'>
      {
        pets && pets.length > 0 ? pets.map((pet, index) => <PetCard key={index} pet = {pet} />) : <h1>Sin mascotas</h1>
      }
    </div>
  )
}
