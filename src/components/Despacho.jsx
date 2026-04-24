import React from 'react';

export default function Despacho() {
  return (
    <div id="despacho" style={{textAlign: 'center', marginBottom: '50px'}}>
      <h2 className="titulo-seccion" style={{borderBottom:'none', marginBottom:'5px'}}>ACCESO A DESPACHO VIRTUAL</h2>
      <div style={{width: '50px', height: '3px', background: '#FF5722', margin: '0 auto 20px'}}></div>
      
      <div style={{margin: '30px 0'}}>
        <a href="https://private.tucomunidapp.com/welcome" target="_blank" rel="noreferrer" className="btn-portal-solido">
          ENTRAR AL PORTAL
        </a>
      </div>

      <div className="instrucciones-card" style={{textAlign: 'left', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)'}}>
        <h3>Instrucciones de Registro:</h3>
        <p style={{marginBottom:'12px'}}>1. Acceda al link anterior y pinche sobre <b>Registrarse</b>.</p>
        <p style={{marginBottom:'12px'}}>2. Escriba su dirección de correo electrónico principal.</p>
        <p style={{marginBottom:'12px'}}>3. Introduzca la clave temporal enviada a su correo.</p>
        <p style={{marginBottom:'12px'}}>4. Introduzca la <b>Clave de Propiedad</b> completa que figura en sus recibos (Ej: 8566-MQS-099-0001).</p>
        <p>5. Confirme su edificio y pinche sobre <b>Finalizar</b> para completar el registro.</p>
      </div>
    </div>
  );
}