import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// 1. IMPORTAMOS FIREBASE (Asegúrate de haber creado el archivo firebase.js)
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useNavScrolled() {
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

function CountUp({ end, suffix = '', duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVal(end);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(end * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function App() {
  // Lógica para el acordeón de servicios
  const [activeIdx, setActiveIdx] = useState(null);
  const toggleAcc = (idx) => setActiveIdx(activeIdx === idx ? null : idx);

  useReveal();
  useNavScrolled();

  // --- LÓGICA DE FIREBASE ---
  // Estado para capturar todos los campos del formulario
  const [formData, setFormData] = useState({});

  // Función para capturar los cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar los datos a Firebase
  const manejarEnvioPresupuesto = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    try {
      // Guardamos en la colección "presupuestos"
      await addDoc(collection(db, "presupuestos"), {
        ...formData,
        fechaEnvio: new Date().toLocaleString() // Añadimos fecha automáticamente
      });
      alert("¡Presupuesto enviado con éxito! Nos pondremos en contacto pronto.");
      e.target.reset(); // Limpia el formulario
      setFormData({}); // Limpia el estado
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error al enviar. Por favor, inténtelo de nuevo.");
    }
  };
  // --- FIN LÓGICA FIREBASE ---

  const servicios = [
    { t: "Registro de la Contabilidad", c: "Registro de la contabilidad con el más avanzado sistema informático, específico para nuestra gestión, que nos permite informar periódicamente a los /as Propietarios /as de las operaciones realizadas durante ese período y donde detallamos morosos (si los hubiera), ingresos, gastos y saldos." },
    { t: "Conciliaciones Bancarias", c: "Conciliaciones bancarias de las cuentas corrientes, estando conectados, previa autorización de la Comunidad, a través de banca electrónica a las entidades bancarias donde estén las cuentas de la misma para recabar toda la información necesaria en tiempo real." },
    { t: "Facturación de Cuotas", c: "Facturación de Cuotas Ordinarias y Extraordinarias, si las hubiera, en recibos mensuales a cada Propietario /a, emitiendo el fichero correspondiente, para el cobro de los recibos domiciliados, que giramos a la entidad bancaria." },
    { t: "Confección de Presupuestos", c: "Confección de presupuestos de gastos anuales (llevando un seguimiento comparativo periódicamente, con los gastos reales) y su distribución por coeficientes de participación." },
    { t: "Gestiones de Cobro a Morosos", c: "Gestiones para cobrar a morosos y demandas de reclamación judicial de cantidades." },
    { t: "Asesoramiento Jurídico y Técnico", c: "Asesoramiento jurídico y técnico. Desempeñamos las funciones de Secretario, asistiendo a las Juntas y levantando las actas correspondientes." },
    { t: "Reclamaciones a Aseguradoras", c: "Reclamaciones a las Compañías Aseguradoras de las indemnizaciones que por siniestros sufridos por la Comunidad le correspondan a ésta y estudio de los condicionados, franquicias, coberturas y primas para conseguir la mejor opción en beneficio del cliente." },
    { t: "Servicios Técnicos Cualificados", c: "Requerir los servicios técnicos cualificados para la reparación inmediata de ascensores, interfonos, instalaciones de televisión, fontanería, electricidad, cerrajería, albañilería, impermeabilización, etc." },
    { t: "Custodia y Archivo", c: "Custodia y archivo de todos los documentos de la Comunidad a disposición de los copropietarios /as que los requieran." },
    { t: "Información General Online", c: "Acceso a la información general de la Comunidad (estatutos, convocatorias, actas, estados de cuentas, saldos de propietarios, etc.), así como a los boletines de noticias de este Despacho, a través del Despacho Virtual 24 Horas." },
    { t: "Despacho Virtual 24 Horas", c: "Comunicarnos incidencias, averías, sugerencias, solicitar certificados, realizar denuncias, el cambio de su domiciliación de pago o de la dirección de su correspondencia, 24 horas al día, 365 días al año." }
  ];

  return (
    <div className="App">
      {/* WHATSAPP */}
      <a href="https://wa.me/34615864610" className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><i className="fab fa-whatsapp"></i></a>

      {/* NAVEGACIÓN */}
      <nav>
        <div className="logo-box" onClick={() => window.location.href='#inicio'}>
          <img src="/IMAGEN1.jpg" alt="Logo ISE" />
        </div>
        <div className="menu">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Quiénes Somos</a>
          <a href="#servicios">Servicios</a>
          <a href="#solicitar" className="btn-nav btn-solicitar-nav">Solicitar<br/>Presupuesto</a>
          <a href="#despacho" className="btn-nav btn-despacho-nav">Despacho<br/>Virtual</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="inicio" className="hero">
        <h1>Iscan Servicio Edificios</h1>
        <p>Administración de Fincas • 35 Años de Excelencia Profesional</p>
        <div className="skyline-box"><img src="/IMAGEN3.PNG" alt="Skyline Las Palmas" /></div>
      </header>

      <div className="container">
        {/* NOSOTROS */}
        <section id="nosotros" className="reveal">
          <h2 className="titulo-seccion">Quiénes Somos</h2>
          <p>Treinta y cinco años de experiencia en la gestión de las Comunidades de Propietarios de Canarias avalan una calidad de servicios que muy pocos podrán ofrecerle, realizando con éxito cuanto nos proponemos para asegurar la buena convivencia en las Comunidades que administramos y la óptima conservación de los inmuebles y sus elementos.</p>
          <br/>
          <p>Administradores de Fincas Colegiados, con la garantía para el Comunero al amparo de un Colegio Profesional y con cualquier riesgo cubierto por una póliza de seguro de responsabilidad profesional que garantiza hasta <b>700.000 €</b> por daños y perjuicios que pudiéramos ocasionar durante el ejercicio de nuestra profesión. Graduados en Administración Inmobiliaria, asociados a la CEPI nos mantenemos en una continua formación que repercute en beneficio de nuestros Administrados y sus Intereses.</p>
        </section>

        {/* FRANJA INDICADORES */}
        <div className="franja-discreta reveal">
          <div className="stat-discreta"><i className="fas fa-award"></i><h4><CountUp end={35} suffix="+" /></h4><p>Años de trayectoria</p></div>
          <div className="stat-discreta"><i className="fas fa-shield-alt"></i><h4><CountUp end={700} suffix="k€" /></h4><p>Seguro Resp. Civil</p></div>
          <div className="stat-discreta"><i className="fas fa-user-check"></i><h4>24/7</h4><p>Despacho Virtual</p></div>
        </div>

        {/* EXCELENCIA */}
        <div className="excelencia-grid">
          <div className="tarjeta-excelencia reveal reveal-delay-1"><i className="fas fa-handshake"></i><h3>Transparencia</h3><p>Cuentas claras y auditables en tiempo real desde su despacho virtual 24/7.</p></div>
          <div className="tarjeta-excelencia reveal reveal-delay-2"><i className="fas fa-tools"></i><h3>Rapidez</h3><p>Atención inmediata a averías con proveedores técnicos homologados de total confianza.</p></div>
          <div className="tarjeta-excelencia reveal reveal-delay-3"><i className="fas fa-users"></i><h3>Mediación</h3><p>Expertos en resolución de conflictos para garantizar una convivencia armoniosa.</p></div>
        </div>

        {/* SERVICIOS */}
        <section id="servicios" className="reveal">
          <h2 className="titulo-seccion">Nuestros Servicios</h2>
          <div className="servicios-container">
            {servicios.map((s, i) => (
              <div className={`servicio-item ${activeIdx === i ? 'is-open' : ''}`} key={i}>
                <div className="servicio-header" onClick={() => toggleAcc(i)}>
                  <span>{s.t}</span><span className="icon-plus">{activeIdx === i ? '−' : '+'}</span>
                </div>
                <div className="servicio-content" style={{ maxHeight: activeIdx === i ? '500px' : '0' }}>
                  <div>{s.c}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRESUPUESTO */}
        <section id="solicitar" className="reveal">
          <h2 className="titulo-seccion">Solicitar Presupuesto</h2>
          {/* CAMBIO: Quitamos action mailto y añadimos onSubmit */}
          <form onSubmit={manejarEnvioPresupuesto} className="form-presupuesto">
            <div className="subtitulo-form">1. DATOS DE CONTACTO</div>
            <input type="text" placeholder="Nombre completo" className="full" name="Nombre" onChange={handleChange} required/>
            <input type="tel" placeholder="Teléfono" name="Telefono" onChange={handleChange} required/>
            <input type="email" placeholder="Email" name="Email" onChange={handleChange} required/>
            <input type="text" placeholder="Nombre de la Comunidad" className="full" name="Comunidad" onChange={handleChange}/>
            <input type="text" placeholder="Dirección de la comunidad" className="full" name="Direccion" onChange={handleChange}/>

            <div className="subtitulo-form">2. DETALLES DE LA EDIFICACIÓN</div>
            <input type="number" placeholder="Número de locales" name="Locales" onChange={handleChange}/>
            <input type="number" placeholder="Número de viviendas" name="Viviendas" onChange={handleChange}/>
            <input type="number" placeholder="Plazas de garaje" name="Garajes" onChange={handleChange}/>
            <input type="number" placeholder="Número de trasteros" name="Trasteros" onChange={handleChange}/>
            <input type="number" placeholder="Cuartos lavaderos" name="Lavaderos" onChange={handleChange}/>
            <input type="number" placeholder="Portales de acceso" name="Portales" onChange={handleChange}/>
            <input type="number" placeholder="Puertas vehículos" name="Puertas_V" onChange={handleChange}/>
            <input type="number" placeholder="Nº botoneras interfono/videoportero" name="Botoneras" onChange={handleChange}/>
            <input type="text" placeholder="Referencia catastral" name="Catastro" onChange={handleChange}/>
            <input type="text" placeholder="Antigüedad edificación" name="Antiguedad" onChange={handleChange}/>
            <input type="number" placeholder="Plantas sobre rasante" name="Plantas_S" onChange={handleChange}/>
            <input type="number" placeholder="Plantas bajo rasante" name="Plantas_B" onChange={handleChange}/>
            <input type="number" placeholder="Número de ascensores" name="Ascensores" onChange={handleChange}/>
            <input type="text" placeholder="Porcentaje morosidad" name="Morosidad" onChange={handleChange}/>

            <div className="subtitulo-form">3. INSTALACIONES Y ESTADO</div>
            <select name="Aljibe" onChange={handleChange}><option value="">¿Aljibe?</option><option>Sí</option><option>No</option></select>
            <input type="text" placeholder="Depósitos de agua" name="Depositos" onChange={handleChange}/>
            <select name="Antena" onChange={handleChange}><option value="">¿Antena TV colectiva?</option><option>Sí</option><option>No</option></select>
            <select name="CCTV" onChange={handleChange}><option value="">¿Videovigilancia?</option><option>Sí</option><option>No</option></select>
            <select name="Deporte" onChange={handleChange}><option value="">¿Canchas deportivas?</option><option>Sí</option><option>No</option></select>
            <select name="Piscina" onChange={handleChange}><option value="">¿Piscina?</option><option>Sí</option><option>No</option></select>
            <select name="Salon" onChange={handleChange}><option value="">¿Salón de actos?</option><option>Sí</option><option>No</option></select>
            <select name="Jardines" onChange={handleChange}><option value="">¿Jardines?</option><option>Sí</option><option>No</option></select>
            <select name="Deudas_P" onChange={handleChange}><option value="">¿Deudas proveedores?</option><option>Sí</option><option>No</option></select>
            <select name="Deudas_O" onChange={handleChange}><option value="">¿Deudas org. oficiales?</option><option>Sí</option><option>No</option></select>
            <select name="Subvenciones" onChange={handleChange}><option value="">¿Subvenciones en trámite?</option><option>Sí</option><option>No</option></select>

            <button type="submit" className="btn-portal-solido full" style={{marginTop:'20px'}}>ENVIAR PRESUPUESTO</button>
          </form>
        </section>

        {/* DESPACHO VIRTUAL */}
        <div id="despacho" className="reveal" style={{textAlign: 'center', marginBottom: '100px'}}>
          <h2 className="titulo-seccion" style={{borderBottom:'none', marginBottom: '5px'}}>ACCESO A DESPACHO VIRTUAL</h2>
          <div style={{width: '50px', height: '3px', background: 'var(--naranja-corp)', margin: '0 auto 20px'}}></div>
          <div className="centered-btn-box">
            <a href="https://private.tucomunidapp.com/welcome" target="_blank" rel="noreferrer" className="btn-portal-solido">ENTRAR AL PORTAL</a>
          </div>
          <div className="instrucciones-card" style={{marginTop:'40px'}}>
            <h3>Instrucciones de Registro:</h3>
            <p style={{marginBottom:'12px'}}>1. Acceda al link anterior y pinche sobre <b>Registrarse</b>.</p>
            <p style={{marginBottom:'12px'}}>2. Escriba su dirección de correo electrónico principal.</p>
            <p style={{marginBottom:'12px'}}>3. Introduzca la clave temporal enviada a su correo.</p>
            <p style={{marginBottom:'12px'}}>4. Introduzca la <b>Clave de Propiedad</b> completa que figura en sus recibos (Ej: 8566-MQS-099-0001).</p>
            <p>5. Confirme su edificio y pinche sobre <b>Finalizar</b> para completar el registro.</p>
          </div>
        </div>

        {/* CONTACTO */}
        <section id="contacto" className="reveal">
          <h2 className="titulo-seccion">Contacto</h2>
          <div className="contacto-grid">
            {/* Aquí también podrías conectar Firebase si quisieras, de momento lo dejamos como mailto según pediste */}
            <form action="mailto:iscan@iscanlp.es" method="post" encType="text/plain" style={{display:'flex', flexDirection:'column', gap:'10px'}}>
              <input type="text" placeholder="Nombre completo" name="Nombre"/>
              <input type="email" placeholder="Email" name="Email"/>
              <textarea placeholder="Su consulta..." name="Consulta" style={{height:'120px'}}></textarea>
              <button type="submit" className="btn-portal-solido">ENVIAR CONSULTA</button>
            </form>
            <div className="info-columna">
              <div className="caja-info-naranja">
                <p><i className="fas fa-location-dot"></i> <span>C/ Núñez de Balboa 1, oficina 3.<br/>35012 Las Palmas de G.C.</span></p>
                <p><i className="fas fa-phone"></i> <span>928 259 410 / 615 864 610</span></p>
                <p><i className="fas fa-envelope"></i> <span>iscan@iscanlp.es</span></p>
              </div>
              <div className="mapa-box">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3519.349!2d-15.43!3d28.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA2JzM2LjAiTiAxNcKwMjUnNDguMCJX!5e0!3m2!1ses!2ses!4v1620000000000"
                  width="100%"
                  height="100%"
                  style={{border:0}}
                  allowFullScreen=""
                  loading="lazy"
                  title="Ubicación Iscan">
                </iframe>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <img src="/IMAGEN2.jpg" alt="Sello" className="laurel"/><br/>
        <p>© 2026 Iscan Servicio Edificios - Administradores de Fincas Colegiados</p>
      </footer>
    </div>
  );
}

export default App;
