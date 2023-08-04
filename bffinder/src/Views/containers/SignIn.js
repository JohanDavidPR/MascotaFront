import React from 'react'
import { useState } from 'react'
import { login } from '../../Data/Services/userService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userData } from '../../Data/Store/reducers/UserReducer';
import Swal from 'sweetalert2'

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = await login(credentials);
        if (user && user.token) {
            // console.log(user);
            dispatch(userData(user));
            //console.log("Usuaro guardado!");
            //localStorage.setItem("user", JSON.stringify(user));
            //navigate('/home')

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Bienvenido ' + user.firstname,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = "/home";
            })

        }
        else {
            // console.log("error -> ", user);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Usuario o contraseña incorrectos',
                showConfirmButton: false,
                timer: 1500
            })
        }
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
