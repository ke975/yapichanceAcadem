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
          <div className="col-lg-9 text-center text-lg-start">
            <h3>¡Transforma tu presencia digital hoy mismo! 🚀

</h3>
            <p> ¿Estás listo para llevar tu marca al siguiente nivel? No dejes que tu competencia se adelante. ¡Aprovecha el poder de las redes sociales y haz crecer tu negocio!

👉 Inscríbete ahora o contáctanos para obtener una consulta gratuita. ¡Juntos haremos que tu marca brille en el mundo digital! 🌟</p>
          </div>
          <div className="col-lg-3 cta-btn-container text-center">
            <a className="cta-btn align-middle" href="">Escribenos Ahora </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
