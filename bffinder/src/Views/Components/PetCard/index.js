import React from 'react'
import '../../../styles/PetCard/petCard.css';
import imgDefault from '../../../Data/Assets/imgs/defaultImg.png';

export default function index({ pet }) {
  return (
    <div className='card-pet'>
      <div className='heard-card'>
        <div className='img-avatar'>
          <img src={imgDefault} alt={pet.nombre} />
        </div>
        <div className='info-pet'>
          <h4>{pet.nombre || "Nombre"}</h4>
          <p>{pet.raza || "Raza"}</p>
        </div>
      </div>
      <div className='img-card'>
        <img src={imgDefault} alt={pet.nombre} />
      </div>
      <button className='btn-card'>Ver más</button>
    </div>
  )
}
