import React, { useState } from 'react'
import "../styles/login.scss";
import SignIn from '../containers/SignIn';
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import SignUp from '../containers/SignUp';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Autenticacion() {

    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };
    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    return <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
            <div className="signin-signup">
                {/* <form className="sign-in-form" onSubmit={handleLogin}>
                    <h2 className="titulo">Iniciar Sesión</h2>

                    <div className="input-field">
                        <i className="fas fa-user" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="ejemplo@mail.com"
                        />
                    </div>

                    <div className="input-field">
                        <i className="fas fa-lock" />
                        <input
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        id="sign-in-btn"
                        type="submit"
                        value="Iniciar Sesión"
                        className="btn"
                    />
                    {token && console.log({ token })}

                    <p className="social-text">O Ingresa con Google</p>

                    <div className="social-media">
                        <button type="button" className="googlebutton">
                            Iniciar sesión con Google
                        </button>
                    </div>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {alertMessage}
                    </Alert>
                </Snackbar>

                <form className="sign-up-form" id="sign-up-form">
                    <h2 className="titulo">Registrarse</h2>

                    <div className="input-field">
                        <i className="fas fa-user" />
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-user" />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope" />
                        <input
                            type="email"
                            placeholder="ejemplo@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock" />
                        <input
                            type="password"
                            placeholder="Crea contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        id="sign-up-btn"
                        value="Registrarse"
                        className="btn"
                        onClick={registerUser}
                    />

                    <p className="social-text">O Registrate con Google</p>

                    <div className="social-media">
                        <button type="button" className="googlebutton">
                            Registrarse con Google
                        </button>
                    </div>
                </form>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={
                            alertMessage === "Registro exitoso" ? "success" : "error"
                        }
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar> */}
                <SignIn />
                <SignUp />
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {"Replicando funcionalidad"}
                    </Alert>
                </Snackbar>
            </div>
        </div>

        <div className="panels-container">
            <div className="panel left-panel">
                <div className="content">
                    <h3> No tienes una cuenta?</h3>
                    <p>
                        Cree una nueva cuenta, para ingresar a BFFinder y adoptar a los
                        peluditos que requieren un hogar 🐾.
                    </p>
                    <button
                        className="btn transparent"
                        id="sign-up-btn"
                        onClick={handleSignUpClick}
                    >
                        Registrate
                    </button>
                </div>
                {/* <img src={imglog} className="image" alt="imglog" /> */}
            </div>

            <div className="panel right-panel">
                <div className="content">
                    <h3>Ya tienes una cuenta?</h3>
                    <p>Ingresa para entrar al sistema.</p>
                    <button
                        className="btn transparent"
                        id="sign-in-btn"
                        onClick={handleSignInClick}
                    >
                        Ir a iniciar sesión
                    </button>
                </div>
                {/* <img src={imgreg} className="image" alt="imgreg" /> */}
            </div>
        </div>
    </div>
}
