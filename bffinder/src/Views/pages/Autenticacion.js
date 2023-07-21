import React, { useState } from 'react'
import "../../styles/login.scss";
import SignIn from '../containers/SignIn';
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import SignUp from '../containers/SignUp';

import imglog from "../../Data/Assets/imgs/login_cat.svg";
import imgreg from "../../Data/Assets/imgs/register_dog.svg";

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
                <img src={imglog} className="image" alt="imglog" />
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
                <img src={imgreg} className="image" alt="imgreg" />
            </div>
        </div>
    </div>
}
