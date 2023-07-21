import React from 'react'
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import Home from '../Views/pages/Home'
import NotFound from '../Views/pages/NotFound'
import Autenticacion from '../Views/pages/Autenticacion'

export default function PublicRouter({ isValid }) {
    return <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={
            !isValid ? (
                <Autenticacion />
            ) : (
                <Navigate to="/home" />
            )
        } />
        <Route path="*" element={<NotFound />} />
    </Routes>
}
