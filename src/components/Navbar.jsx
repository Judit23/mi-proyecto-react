import React from 'react';

const Navbar = () => (
  <nav>
    <div className="logo-box" onClick={() => window.location.href='#inicio'}>
      <img src="/IMAGEN1.jpg" alt="Logo ISE" />
    </div>
    <div className="menu">
      <a href="#inicio">Inicio</a>
      <a href="#nosotros">Quiénes Somos</a>
      <a href="#servicios">Servicios</a>
      <a href="#solicitar" className="btn-nav btn-solicitar-nav">Solicitar<br />Presupuesto</a>
      <a href="#despacho" className="btn-nav btn-despacho-nav">Despacho<br />Virtual</a>
      <a href="#contacto">Contacto</a>
    </div>
  </nav>
);

export default Navbar;