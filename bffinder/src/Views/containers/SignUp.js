import React from 'react'
import { useState } from 'react'
import { register } from '../../Data/Services/userService'
import Swal from 'sweetalert2'

export default function SignUp() {

    const [userRegister, setUserRegister] = useState({
        identification_number: '',
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange =  (e) => {
        setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const result = await register(userRegister);
        console.log(result);
        if(result.status === 'success'){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario registrado correctamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = "/login";
            })
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al registrar usuario, vuelve a intentarlo',
                showConfirmButton: false,
                timer: 1500
            })
        }

        // console.log(register);
    }

    return <form className="sign-up-form" id="sign-up-form">
        <h2 className="titulo">Registrarse</h2>

        <div className="input-field">
            <i className="fas fa-user" />
            <input
                type="text"
                placeholder="Identificación"
                value={userRegister.identification_number }
                name='identification_number'
                onChange={handleChange}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-user" />
            <input
                type="text"
                placeholder="Username"
                value={userRegister.username }
                name='username'
                onChange={handleChange}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-user" />
            <input
                type="text"
                placeholder="Nombre"
                value={userRegister.firstname}
                name='firstname'
                onChange={handleChange}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-user" />
            <input
                type="text"
                placeholder="Apellido"
                value={userRegister.lastname}
                name='lastname'
                onChange={handleChange}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-envelope" />
            <input
                type="email"
                placeholder="ejemplo@mail.com"
                value={userRegister.email}
                name='email'
                onChange={handleChange}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-lock" />
            <input
                type="password"
                placeholder="Crea contraseña"
                value={userRegister.password}
                name='password'
                onChange={handleChange}
            />
        </div>

        <input
            type="submit"
            id="sign-up-btn"
            value="Registrarse"
            className="btn"
            onClick={handleRegister}
        />

        <p className="social-text">O Registrate con Google</p>

        <div className="social-media">
            <button type="button" className="googlebutton">
                Registrarse con Google
            </button>
        </div>
    </form>
}
