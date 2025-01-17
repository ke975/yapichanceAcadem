import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png'
import '../assets/css/Footer.css';

const FooterLinkList = ({ title, links }) => (
    <div className="col-lg-3 col-md-6 footer-links">
        <h4>{title}</h4>
        <ul>
            {links.map((link) => (
                <li key={link.title}><i className="bx bx-chevron-right"></i> <a href={link.url}>{link.title}</a></li>
            ))}
        </ul>
    </div>
);

const SocialLinks = ({ links }) => (
    <div className="social-links mt-3">
        {links.map((link) => (
            <a key={link.name} href={link.url} className={link.name}><i className={`bx bxl-${link.name}`}></i></a>
        ))}
    </div>
);

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Email submitted:', email);
        setEmail(''); // Clearing the input field after submission
    };

    return (
        <div className="footer-newsletter">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                     
                    </div>
                </div>
            </div>
        </div>
    );
};

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        isVisible && 
        <a onClick={scrollToTop} className="back-to-top d-flex align-items-center justify-content-center" href="javascript:void(0)">
            <i className="bi bi-arrow-up-short"></i>
        </a>
    );
};

const Footer = () => {
    const usefulLinks = [
        { title: "Inicio", url: "#hero" },
        { title: "Sobre Nosotros", url: "#about-2" },
        { title: "Servicios", url: "#services" },
       
    ];

    const serviceLinks = [
        { title: "Administración de Redes Sociales", url: "#" },
        { title: "Diseño de Web", url: "#" },
        { title: "Marketing Digital", url: "#" },
        { title: "Diseño Gráfico", url: "#" },
        { title: "Capacitaciones de Emprendimiento", url: "#" }
    ];

    const socialLinks = [
      
        { name: "facebook", url: "https://www.facebook.com/yapichanceacademy/" },
        { name: "instagram", url: "https://www.instagram.com/imtiyaz_15/?hl=en" },
        { name: "skype", url: "#" },
        { name: "linkedin", url: "https://in.linkedin.com/in/shamim-imtiyaz-11a3406b" }
    ];

    return (
        <footer id="footer">
            <Newsletter />
            <div className='footer-top'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-lg-3 col-md-6 footer-contact">
                            <img src={Logo} className='img-fluid mb-3 ' width={100} alt="logotipo de la Empresa " />
                            <address>
                            De los Semáforos de Enabas una cuadra al este y media al sur, Estelí. <br />
                                 <br />
                                <br /><br />
                                <strong>Numero de Telefono:</strong> +505 8695-0225<br />
                                <strong>Email:</strong> yapichance.academy@gmail.com<br />
                            </address>
                        </div>

                        <FooterLinkList title="Navegación de la Pagina " links={usefulLinks} />
                        <FooterLinkList title="Nuestros Servicios" links={serviceLinks} />

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Nuestras Redes Sociales </h4>
                            <p>Siuguenos para saber sobre nuestros eventos Gratuitos</p>
                            <SocialLinks links={socialLinks} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container footer-bottom clearfix">
                <div className="copyright">
                    &copy; Copyright <strong><span>Yapichance </span></strong>. Todos los Derechos Reservados.
                </div>
                <div className="credits">
                    Designed by <a href="https://github.com/imtiyazshamim/">Shamim Imtiyaz</a>
                </div>
            </div>

            <BackToTop />
        </footer>
    );
}

export default Footer;
