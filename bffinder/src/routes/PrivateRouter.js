import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'
import Perfil from '../Views/pages/Perfil'

export default function PrivateRouter() {
  return <Routes >
    <Route path="/perfil" element={< Perfil />} />
  </Routes>
}