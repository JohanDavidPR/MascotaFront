import React from 'react'
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import Home from '../Views/pages/Home'
import NotFound from '../Views/pages/NotFound'
import Autenticacion from '../Views/pages/Autenticacion'

export default function PublicRouter({ isLoggedIn }) {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Autenticacion />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
