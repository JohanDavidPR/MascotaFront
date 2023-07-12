import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Perfil from '../pages/Perfil'
import Autenticacion from '../pages/Autenticacion'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

export default function PublicRouter() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Autenticacion />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
}
