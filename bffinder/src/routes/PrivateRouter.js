import React from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Perfil from '../Views/pages/Perfil'
import NotFound from '../Views/pages/NotFound'

export default function PrivateRouter({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route path="/perfil" element={<Perfil />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}