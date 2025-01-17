import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/Cta.css';

function Cta() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <section id="cta" className="cta">
      <div className="container" data-aos="zoom-in">
        <div className="row">
          <div className="col-lg-12 text-center text-lg-start">
            <h3 className='text-center'>¡Transforma tu futuro hoy mismo! 🚀 

</h3>
            <p className='text-center'> ¿Estás listo para mejorar tus habilidades y avanzar en tu carrera? No dejes pasar esta oportunidad. ¡Aprovecha el poder de la educación y adquiere nuevas competencias que te diferenciarán! 👉 Inscríbete ahora o contáctanos para obtener una consulta gratuita. ¡Juntos te ayudaremos a alcanzar tus metas y a brillar en tu campo profesional! 🌟</p>
          </div>
        
        </div>
      </div>
    </section>
  );
}

export default Cta;
