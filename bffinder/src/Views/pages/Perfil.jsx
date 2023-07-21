import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Perfil = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

//   useEffect(() => {
//     // Función para obtener los datos del usuario
//     const fetchUserData = async () => {
//       try {
//         // Realizar la solicitud para obtener los datos del usuario utilizando el token de autenticación
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/user/credentials", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const userData = response.data; // Suponiendo que los datos del usuario se encuentran en la respuesta de la API

//         setUserData(userData); // Guardar los datos del usuario en el estado
//       } catch (error) {
//         // Manejar errores de solicitud aquí
//         console.error("Error al obtener los datos del usuario", error);
//       }
//     };

//     fetchUserData(); // Llamar a la función para obtener los datos del usuario al cargar la página de perfil
//   }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Realiza las acciones de cierre de sesión aquí, como eliminar el token de autenticación del almacenamiento

    // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
    navigate("/login");
  };

//   if (!userData) {
//     return <p>Cargando datos del usuario...</p>;
//   }

  return (
    <div>
      <h1>INGRESO AL PERFIL</h1>
      <p>🎂</p>

      {/* <h1>Perfil del Usuario</h1>
      <p>Correo electrónico: {userData.correo}</p> */}

      <form onSubmit={handleLogout}>
        <input
          id="sign-in-btn"
          type="submit"
          value="Cerrar Sesión"
          className="btn"
        />
      </form>
    </div>
  );
};

export default Perfil;
