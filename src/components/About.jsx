import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiCheckDoubleLine } from 'react-icons/ri';
import '../assets/css/About.css';

const AboutListItem = ({ children }) => (
  <li><RiCheckDoubleLine className='icon-blue'/> {children}</li>
);

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  const aboutContent = [
"Compromiso: Nos comprometemos con la calidad educativa, buscando siempre lo mejor para nuestros estudiantes.",
    "Innovación: Impulsamos el aprendizaje y la creatividad a través de metodologías innovadoras.",
    
  ];

  return (
    <section id='About-2' >
      <div className='container' data-aos="fade-up">
        <div className='section-title' >
          <h2 className='text-center mb-5'>Sobre Nosotros </h2>
        </div>
        <div className='row content'>
          <div className='col-lg-6'>
            <p>
            El Centro de Educación Continua Yapichance es una institución dedicada a ofrecer formación de alta calidad en diversas áreas del conocimiento, adaptada a las necesidades del mundo actual. Nos especializamos en proporcionar cursos prácticos, accesibles y orientados a resultados, diseñados tanto para quienes desean iniciar su carrera como para aquellos que buscan actualizar y expandir sus habilidades profesionales.            </p>
            <ul className='no-bullet'>
              {aboutContent.map((item, index) => (
                <AboutListItem key={index}>{item}</AboutListItem>
              ))}
            </ul>
          </div>
          <div className='col-lg-6 pt-4 pt-lg-0'>
            <p>
            Misión: Formar profesionales altamente capacitados en diversas disciplinas, ofreciendo una educación continua que combine teoría y práctica, promoviendo la innovación, el emprendimiento y el desarrollo de habilidades esenciales para el futuro.            </p>

            Visión: Convertirnos en un referente de educación continua, proporcionando a nuestros estudiantes una educación accesible, flexible y actualizada que les permita mejorar sus oportunidades laborales y contribuir al desarrollo de su comunidad 
          </div>
        
        </div>
      </div>
    </section>
  );
}

export default About;
