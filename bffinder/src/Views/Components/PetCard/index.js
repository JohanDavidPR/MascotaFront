import React from 'react'
import '../../../styles/PetCard/petCard.css';
import imgDefault from '../../../Data/Assets/imgs/imgDefault.jpg';

export default function index({pet}) {
  return (
    <div className='card-pet'>
      <div className='heard-card'>

      </div>
      <div className='img-card'>
        <img src={imgDefault} alt={pet.nombre} />
      </div>
    </div>
  )
}
