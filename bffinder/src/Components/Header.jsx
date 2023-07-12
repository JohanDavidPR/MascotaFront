import React, { useEffect, useState } from 'react';
import 'styles/Header.scss';
import { Button } from "@mui/material";

const Header = () => {

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      header.classList.toggle('abajo', window.scrollY > 0);
    });
  }, []);

  return (
    <div>
      <header>
        <a href="#" className="logo">
          BFFinder
        </a>
        <nav>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Nosotros</a>
            </li>
            <li>
              <a href="#">Servicios</a>
            </li>
            <li>
              <a href="#">Portafolio</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="zona1 fondo" />
      <section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </section>
      <Button>Prueba</Button>
    </div>
  );
};

export default Header;
