import React from 'react'
import { useState } from 'react'

export default function SignUp() {

    const [register, setRegister] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    return <form className="sign-up-form" id="sign-up-form">
        <h2 className="titulo">Registrarse</h2>

        <div className="input-field">
            <i className="fas fa-user" />
            <input
                type="text"
                placeholder="Nombre"
                value={register.firstname}
                name='firstname'
                onChange={handleChange}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-user" />
            <input
                type="text"
                placeholder="Apellido"
                value={register.lastname}
                name='lastname'
                onChange={handleChange}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-envelope" />
            <input
                type="email"
                placeholder="ejemplo@mail.com"
                value={register.email}
                name='email'
                onChange={handleChange}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-lock" />
            <input
                type="password"
                placeholder="Crea contraseña"
                value={register.password}
                name='password'
                onChange={handleChange}
            />
        </div>

        <input
            type="submit"
            id="sign-up-btn"
            value="Registrarse"
            className="btn"
            // onClick={registerUser}
        />

        <p className="social-text">O Registrate con Google</p>

        <div className="social-media">
            <button type="button" className="googlebutton">
                Registrarse con Google
            </button>
        </div>
    </form>
}
