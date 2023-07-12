import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/login.scss";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import imglog from "imgs/login_cat.svg";
import imgreg from "imgs/register_dog.svg";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // Obtiene el objeto navigate

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (token) {
      setAlertMessage("Registro exitoso");
      setOpen(true);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [token]);

  const registerUser = async (e) => {
    e.preventDefault();

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === ""
    ) {
      setAlertMessage(
        "Por favor llene todos los campos para poder registrarse"
      );
      setOpen(true);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:9090/auth/register",
          {
            firstname,
            lastname,
            email,
            password,
          }
        );

        const token = response.data.token; // Suponiendo que el token se encuentra en la propiedad "token" de la respuesta

        console.log(token); // Muestra el token en la consola

        setToken(token);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9090/auth/authenticate",
        {
          username: username,
          password: password,
        }
      );

      // Aquí puedes manejar la respuesta de la API, como almacenar el token de autenticación en el estado de tu aplicación.
      setToken(response.data.token);
      setUsername("");
      setPassword("");
      navigate("/perfil");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setAlertMessage("El usuario no se encuentra registrado en el sistema");
      }
      if (error.response && error.response.status === 403) {
        setAlertMessage("Por favor, llene todos los campos");
      } else {
        setAlertMessage(
          "El correo electrónico o la contraseña son incorrectas"
        );
      }
      setOpen(true);
      console.error(error);
    }
  };

  //animación
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };
  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");

    sign_up_btn.addEventListener("click", handleSignUpClick);
    sign_in_btn.addEventListener("click", handleSignInClick);

    return () => {
      sign_up_btn.removeEventListener("click", handleSignUpClick);
      sign_in_btn.removeEventListener("click", handleSignInClick);
    };
  }, []);

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleLogin}>
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
  );
};

export default Login;
