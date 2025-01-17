import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/Team.css';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// Importing team images
import team1 from '../assets/img/team/team-1.jpg';
import team2 from '../assets/img/team/team-2.jpeg';


function Team() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }, []);

    return (
        <section id="team" className="team section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2 className='text-center'> Nuestro Equipo </h2>
                    <p className='text-center'>El equipo de trabajo de Yapichance está compuesto por un grupo diverso de profesionales apasionados por la innovación y el crecimiento. Cada colaborador aporta su experiencia en áreas clave como desarrollo de tecnología, marketing digital, atención al cliente y gestión de proyectos, trabajando de manera colaborativa para lograr los objetivos de la empresa. La cultura dentro de Yapichance se enfoca en la creatividad, el trabajo en equipo y el compromiso con la excelencia, lo que permite a cada miembro crecer profesionalmente mientras contribuye al éxito global de la empresa. A través de una comunicación abierta y un ambiente de respeto y confianza, el equipo de Yapichance logra crear soluciones innovadoras que buscan transformar su sector y superar las expectativas de sus clientes.</p>
                </div>

                <div className="row">
                    {/* Team member 1 */}
                    <div className="col-lg-6 mt-4 " data-aos="zoom-in" data-aos-delay="100">
                        <div className="member d-flex align-items-start">
                            <div className="pic"><img src={team1} className="img-fluid" alt="Walter White" /></div>
                            <div className="member-info">
                                <h4>Pedro Antonio Castillo Torres </h4>
                                <span>CEO</span>
                                <p></p>
                                <div className="social">
                                    <a href="#"><FaTwitter /></a>
                                    <a href="#"><FaFacebookF /></a>
                                    <a href="#"><FaInstagram /></a>
                                    <a href="#"><FaLinkedinIn /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team member 2 */}
                    <div className="col-lg-6 mt-4 " data-aos="zoom-in" data-aos-delay="200">
                        <div className="member d-flex align-items-start">
                            <div className="pic"><img src={team2} className="img-fluid" alt="Sarah Jhonson" /></div>
                            <div className="member-info">
                                <h4>Kevin Omar Castillo Torres</h4>
                                <span>CTO/Comunity Manager</span>
                                <p>Encargado del Area de Marketin y Sistemas de Información de Centro de Educación Continua Yapichance</p>
                                <div className="social">
                                    <a href="#"><FaTwitter /></a>
                                    <a href="#"><FaFacebookF /></a>
                                    <a href="#"><FaInstagram /></a>
                                    <a href="#"><FaLinkedinIn /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team member 3 */}
                  
                </div>
            </div>
        </section>
    );
}

export default Team;
