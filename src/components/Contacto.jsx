import React from 'react';

const Contacto = () => (
  <section id="contacto">
    <h2 className="titulo-seccion">Contacto</h2>
    <div className="contacto-grid">
        <form action="mailto:iscan@iscanlp.es" method="post" encType="text/plain" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="Nombre completo" name="Nombre" />
            <input type="email" placeholder="Email" name="Email" />
            <textarea placeholder="Su consulta..." name="Consulta" style={{ height: '120px' }}></textarea>
            <button type="submit" className="btn-portal-solido">ENVIAR CONSULTA</button>
        </form>
        <div className="info-columna">
            <div className="caja-info-naranja">
                <p><i className="fas fa-location-dot"></i> C/ Núñez de Balboa 1, oficina 3.<br />35012 Las Palmas de G.C.</p>
                <p><i className="fas fa-phone"></i> 928 259 410 / 615 864 610</p>
                <p><i className="fas fa-envelope"></i> iscan@iscanlp.es</p>
            </div>
            <div className="mapa-box">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3519.5312784534725!2d-15.4211186!3d28.1150000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40951111111111%3A0x1111111111111111!2zQy8gTsO6w7FleiBkZSBCYWxib2EsIDEsIDM1MDEyIExhcyBQYWxtYXMgZGUgR3JhbiBDYW5hcmlhLCBMYXMgUGFsbWFz!5e0!3m2!1ses!2ses!4v1700000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
            </div>
        </div>
    </div>
  </section>
);

export default Contacto;