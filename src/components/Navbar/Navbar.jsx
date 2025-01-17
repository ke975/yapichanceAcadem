import React, { useState, useEffect } from 'react';
import '../../assets/css/Nav.css';
import {Link} from'react-router-dom' // Make sure the CSS path is correct
import 'bootstrap-icons/font/bootstrap-icons.css';
import Blanco from '../../assets/Blanco.png';


export const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [dropdownActive, setDropdownActive] = useState({}); // Using an object to manage multiple dropdowns

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 100);

      let activeFound = false;
      document.querySelectorAll('#navbar .scrollto').forEach(navbarLink => {
        const section = document.querySelector(navbarLink.hash);
        const position = window.scrollY + 200;
        if (section && position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          setActiveLink(navbarLink.hash);
          activeFound = true;
        }
      });
      if (!activeFound) setActiveLink('');
    };

    handleScroll(); // Call handleScroll on component mount to set initial state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (el) => {
    el.preventDefault();
    const href = el.currentTarget.getAttribute('href');
    const offsetTop = document.querySelector(href)?.offsetTop - document.querySelector('#header').offsetHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });

    if (!isNavCollapsed) setIsNavCollapsed(true);
  };

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
    console.log("Toggled Nav:", !isNavCollapsed); // Debugging
  };
  

  const toggleDropdown = (index) => (e) => {
    e.preventDefault();
    setDropdownActive(prevState => ({ ...prevState, [index]: !prevState[index] }));
  };

  

  return (
    <header id="header" className={`fixed-top ${headerScrolled ? 'header-scrolled' : ''}`}>
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto"><a href="index.html"><img src={Blanco} alt="" /></a></h1>

        <nav id="navbar" className={`navbar ${isNavCollapsed ? '' : 'navbar-mobile'}`}>
          <ul>
            <li><a className={`nav-link scrollto nav1 ${activeLink === '#hero' ? 'active' : ''}`} href="#hero" onClick={scrollTo}>Inicio</a></li>
            <li><a className={`nav-link scrollto ${activeLink === '#about-2' ? 'active' : ''}`} href="#about-2" onClick={scrollTo}>Sobre Nosotros </a></li>
            <li><a className={`nav-link scrollto ${activeLink === '#services' ? 'active' : ''}`} href="#services" onClick={scrollTo}>Servicios</a></li>
            <li><a className={`nav-link scrollto ${activeLink === '#team' ? 'active' : ''}`} href="#team" onClick={scrollTo}>Team</a></li>
           
        
            <Link  to ="/login"> Iniciar Sesión </Link>
            

          </ul>
          <i className={`bi mobile-nav-toggle ${isNavCollapsed ? 'bi-list' : 'bi-x'}`} onClick={toggleNav}></i>
        </nav>
      </div>
    </header>
  );
};

