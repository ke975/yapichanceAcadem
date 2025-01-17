import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/Services.css';

const ServiceCard = ({ iconClass, title, description, delay }) => (
  <div className={`col-xl-3 col-md-6 d-flex align-items-stretch mt-4 ${delay ? `mt-xl-0` : ''}`} data-aos="zoom-in" data-aos-delay={delay}>
    <div className="icon-box">
      <div className="icon"><i className={iconClass}></i></div>
      <h4><a href="">{title}</a></h4>
      <p>{description}</p>
    </div>
  </div>
);

function Services() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  const services = [
    {
      iconClass: "bx bxl-dribbble",
      title: "Administración de Redes Sociales ",
      description: "En el mundo digital actual, las redes sociales son una herramienta fundamental para conectar con audiencias, fortalecer la marca y generar engagement.",
      delay: "100"
    },
    {
      iconClass: "bx bx-file",
      title: "Diseño de Web ",
      description: "Diseño de paginas web par atu negocio online de ventas de productos ",
      delay: "200"
    },
    {
      iconClass: "bx bx-tachometer",
      title: "Marketing Digital ",
      description: "Haz Crecer tu Negocio Atraves de Estrategias de Marketing Digital para atraer mas clientes a tu negocio",
      delay: "300"
    },
    {
      iconClass: "bx bx-layer",
      title: "Diseño Gráfico ",
      description: "Diseñamos la marca de tu negocio desde Zero",
      delay: "400"
    }
    // ... add more services here if needed
  ];

  return (
    <section id="services" className="services section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2 className='text-center mb-5'>Servicios </h2>
          <p>En el Centro de Educación Continua Yapichance, nos dedicamos a ofrecer servicios educativos de calidad que se ajustan a las necesidades de nuestros estudiantes y profesionales. Nuestra oferta abarca una variedad de cursos y programas diseñados para brindarles a los participantes las herramientas necesarias para mejorar sus habilidades y avanzar en sus carreras.</p>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
