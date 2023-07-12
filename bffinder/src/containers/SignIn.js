import React from 'react'
import { useState } from 'react'

export default function SignIn() {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    // const handleChange = (e) => {
    //     setCredentials({
    //         ...credentials,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const handleLogin = (e) => {
        e.preventDefault();
    }

    return <form className="sign-in-form" onSubmit={handleLogin}>
        <h2 className="titulo">Iniciar Sesión</h2>

        <div className="input-field">
            <i className="fas fa-user" />
            <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="ejemplo@mail.com"
            />
        </div>

        <div className="input-field">
            <i className="fas fa-lock" />
            <input
                type="password"
                placeholder="******"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
        </div>

        <input
            id="sign-in-btn"
            type="submit"
            value="Iniciar Sesión"
            className="btn"
        />

        <p className="social-text">O Ingresa con Google</p>

        <div className="social-media">
            <button type="button" className="googlebutton">
                Iniciar sesión con Google
            </button>
        </div>
    </form>
}
