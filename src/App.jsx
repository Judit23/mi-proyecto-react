import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";

// Componente para animar números
function CountUp({ end, suffix = '', duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setVal(Math.floor(progress * end));
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function App() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [formData, setFormData] = useState({});

  // Efecto para Revelar elementos al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const manejarEnvioPresupuesto = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "presupuestos"), {
        ...formData,
        fechaEnvio: new Date().toLocaleString()
      });
      alert("¡Presupuesto enviado con éxito!");
      e.target.reset();
    } catch (error) {
      alert("Error al enviar.");
    }
  };

  const servicios = [
    { t: "Registro de la Contabilidad", c: "Registro detallado con sistemas informáticos avanzados." },
    { t: "Conciliaciones Bancarias", c: "Control en tiempo real de las cuentas de la comunidad." },
    { t: "Facturación de Cuotas", c: "Gestión de recibos ordinarios y extraordinarios." },
    { t: "Gestiones de Cobro a Morosos", c: "Reclamación judicial y seguimiento de impagos." },
    { t: "Despacho Virtual 24 Horas", c: "Acceso total a la información desde cualquier lugar." }
  ];

  return (
    <div className="App">
      <a href="https://wa.me/34615864610" className="whatsapp-float" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>

      <nav>
        <div className="logo-box" onClick={() => window.location.href='#inicio'}>
          <img src="/IMAGEN1.jpg" alt="Logo ISE" />
        </div>
        <div className="menu">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
          <a href="#solicitar" className="btn-nav btn-solicitar-nav">Presupuesto</a>
          <a href="#despacho" className="btn-nav btn-despacho-nav">Virtual</a>
        </div>
      </nav>

      <header id="inicio" className="hero">
        <div className="reveal">
            <h1>Iscan Servicio Edificios</h1>
            <p>Administración de Fincas • 35 Años de Excelencia</p>
            <div className="skyline-box">
                <img src="/IMAGEN3.PNG" alt="Las Palmas" />
            </div>
        </div>
      </header>

      <div className="container">
        <section id="nosotros" className="reveal">
          <h2 className="titulo-seccion">Quiénes Somos</h2>
          <p>Treinta y cinco años de experiencia en la gestión de las Comunidades de Propietarios de Canarias avalan nuestra calidad.</p>
        </section>

        <div className="franja-discreta reveal">
          <div className="stat-discreta"><h4><CountUp end={35} suffix="+" /></h4><p>Años</p></div>
          <div className="stat-discreta"><h4><CountUp end={700} suffix="k€" /></h4><p>Garantía</p></div>
          <div className="stat-discreta"><h4>24/7</h4><p>Atención</p></div>
        </div>

        <section id="servicios" className="reveal">
          <h2 className="titulo-seccion">Nuestros Servicios</h2>
          {servicios.map((s, i) => (
            <div className="servicio-item" key={i}>
              <div className="servicio-header" onClick={() => setActiveIdx(activeIdx === i ? null : i)}>
                {s.t} <span>{activeIdx === i ? '-' : '+'}</span>
              </div>
              <div className="servicio-content" style={{ maxHeight: activeIdx === i ? '200px' : '0' }}>
                <div style={{padding: '15px'}}>{s.c}</div>
              </div>
            </div>
          ))}
        </section>

        <section id="solicitar" className="reveal">
          <h2 className="titulo-seccion">Presupuesto</h2>
          <form onSubmit={manejarEnvioPresupuesto} className="form-presupuesto">
            <input type="text" name="Nombre" placeholder="Nombre" className="full" onChange={handleChange} required />
            <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
            <input type="tel" name="Tel" placeholder="Teléfono" onChange={handleChange} required />
            <textarea name="Msg" placeholder="Detalles de la comunidad" className="full" onChange={handleChange}></textarea>
            <button type="submit" className="btn-nav btn-despacho-nav full" style={{padding:'15px', fontSize:'1rem'}}>ENVIAR SOLICITUD</button>
          </form>
        </section>

        <section id="contacto" className="reveal">
            <h2 className="titulo-seccion">Contacto</h2>
            <div className="contacto-grid">
                <div className="caja-info-naranja">
                    <p>📍 C/ Núñez de Balboa 1, Las Palmas</p>
                    <p>📞 928 259 410</p>
                    <p>✉️ iscan@iscanlp.es</p>
                </div>
                <div className="mapa-box">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3519.3475!2d-15.42!3d28.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA2JzAwLjAiTiAxNcKwMjUnMTIuMCJX!5e0!3m2!1ses!2ses!4v1620000000000" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                </div>
            </div>
        </section>
      </div>

      <footer>
        <p>© 2026 Iscan Servicio Edificios</p>
      </footer>
    </div>
  );
}

export default App;