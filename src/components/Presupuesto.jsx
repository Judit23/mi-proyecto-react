import React from 'react';

const Presupuesto = () => (
  <section id="solicitar">
    <h2 className="titulo-seccion">Solicitar Presupuesto</h2>
    <form action="mailto:iscan@iscanlp.es" method="post" encType="text/plain" className="form-presupuesto">
        <div className="subtitulo-form">1. DATOS DE CONTACTO</div>
        <input type="text" placeholder="Nombre completo" className="full" name="Nombre" />
        <input type="tel" placeholder="Teléfono" name="Telefono" />
        <input type="email" placeholder="Email" name="Email" />
        <input type="text" placeholder="Nombre de la Comunidad" className="full" name="Comunidad" />
        <input type="text" placeholder="Dirección de la comunidad" className="full" name="Direccion" />
        
        <div className="subtitulo-form">2. DETALLES DE LA EDIFICACIÓN</div>
        <input type="number" placeholder="Número de locales" name="Locales" />
        <input type="number" placeholder="Número de viviendas" name="Viviendas" />
        <input type="number" placeholder="Plazas de garaje" name="Garajes" />
        <input type="number" placeholder="Número de trasteros" name="Trasteros" />
        <input type="number" placeholder="Cuartos lavaderos" name="Lavaderos" />
        <input type="number" placeholder="Portales de acceso" name="Portales" />
        <input type="number" placeholder="Puertas vehículos" name="Puertas_V" />
        <input type="number" placeholder="Nº botoneras interfono/videoportero" name="Botoneras" />
        <input type="text" placeholder="Referencia catastral" name="Catastro" />
        <input type="text" placeholder="Antigüedad edificación" name="Antiguedad" />
        <input type="number" placeholder="Plantas sobre rasante" name="Plantas_S" />
        <input type="number" placeholder="Plantas bajo rasante" name="Plantas_B" />
        <input type="number" placeholder="Número de ascensores" name="Ascensores" />
        <input type="text" placeholder="Porcentaje morosidad" name="Morosidad" />

        <div className="subtitulo-form">3. INSTALACIONES Y ESTADO</div>
        <select name="Aljibe"><option value="">¿Aljibe?</option><option>Sí</option><option>No</option></select>
        <input type="text" placeholder="Depósitos de agua" name="Depositos" />
        <select name="Antena"><option value="">¿Antena TV colectiva?</option><option>Sí</option><option>No</option></select>
        <select name="CCTV"><option value="">¿Videovigilancia?</option><option>Sí</option><option>No</option></select>
        <select name="Deporte"><option value="">¿Canchas deportivas?</option><option>Sí</option><option>No</option></select>
        <select name="Piscina"><option value="">¿Piscina?</option><option>Sí</option><option>No</option></select>
        <select name="Salon"><option value="">¿Salón de actos?</option><option>Sí</option><option>No</option></select>
        <select name="Jardines"><option value="">¿Jardines?</option><option>Sí</option><option>No</option></select>
        <select name="Deudas_P"><option value="">¿Deudas proveedores?</option><option>Sí</option><option>No</option></select>
        <select name="Deudas_O"><option value="">¿Deudas org. oficiales?</option><option>Sí</option><option>No</option></select>
        <select name="Subvenciones"><option value="">¿Subvenciones en trámite?</option><option>Sí</option><option>No</option></select>

        <button type="submit" className="btn-portal-solido full" style={{ marginTop: '20px' }}>ENVIAR PRESUPUESTO</button>
    </form>
  </section>
);

export default Presupuesto;