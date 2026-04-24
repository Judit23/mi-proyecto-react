import React, { useState } from 'react';

const Servicios = () => {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  const lista = [
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
    <section id="servicios">
      <h2 className="titulo-seccion">Nuestros Servicios</h2>
      <div className="servicios-container">
        {lista.map((item, i) => (
          <div className="servicio-item" key={i}>
            <div className="servicio-header" onClick={() => toggle(i)}>
              <span>{item.t}</span>
              <span className="icon-plus">{active === i ? '-' : '+'}</span>
            </div>
            <div className="servicio-content" style={{ maxH: active === i ? '500px' : '0', maxHeight: active === i ? '500px' : '0' }}>
              <div>{item.c}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;