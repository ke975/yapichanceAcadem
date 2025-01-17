import React, { useEffect } from 'react';
import { PlayCircle } from 'react-bootstrap-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner_img from '../assets/fondo.png';
import '../assets/css/Banner.css';

function BannerButton({ href, className, icon, text }) {
  return (
    <a href={href} className={className}>
      {icon && <PlayCircle className='icon-video'/>}
      <span>{text}</span>
    </a>
  );
}

function Banner() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h1 className='text-center'>Centro de Educación Continua Yapichance  </h1>
              <h2 className='text-center'>Desarrolla tu potencial, construye el futuro.</h2>
              <div className="d-flex justify-content-center justify-content-lg-start ">
                <BannerButton href ="wa.link/x294gz" className="btn-get-started scrollto " text="Estudia con Nosotros " />
                <BannerButton href="https://www.youtube.com/watch?v=epNnZ9UHKOs" className="glightbox btn-watch-video" icon={<PlayCircle className='icon-video'/>} text="Sobre Nosotros" />
              </div>
            </div>
           
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
