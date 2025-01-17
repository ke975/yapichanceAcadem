import React, { useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom'
import '../assets/css/Nav.css'; // Make sure the CSS path is correct
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo  from '../assets/Blanco.png'

const Header = () => {
  const [activeLink, setActiveLink] = useState('');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [dropdownActive, setDropdownActive] = useState({}); // Using an object to manage multiple dropdowns

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        // Realizar el logout desde el contexto
        logout(); // Esto eliminará los datos del localStorage y reseteará el estado de usuario

        // Navegar a la página de login
        navigate('/login');
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
        alert('Hubo un error al cerrar sesión. Por favor, inténtalo de nuevo.');
    }
};
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
        <h1 className="logo me-auto"><a href="index.html"><img src={Logo} alt="" /></a></h1>

        <nav id="navbar" className={`navbar ${isNavCollapsed ? '' : 'navbar-mobile'}`}>
          <ul>
            <li><a className={`nav-link scrollto nav1 ${activeLink === '#hero' ? 'active' : ''}`} href="#hero" onClick={scrollTo}>Inicio</a></li>
            <li><a className={`nav-link scrollto ${activeLink === '#portfolio' ? 'active' : ''}`} href="#portfolio" onClick={scrollTo}>Cursos </a></li>
            <li className="dropdown">
              <a href="#/" onClick={toggleDropdown('dropdown1')}><span>Cerrar Sesión </span> <i className="bi bi-chevron-down"></i></a>
              <ul className={`${dropdownActive['dropdown1'] ? 'dropdown-active' : ''}`}>
                <li>
            <p>Bienvenido {user.name}</p>
            <p onClick={handleLogout} className="btn btn-danger ">Salir </p></li>
                <li className="dropdown">
                
                </li>
               
              </ul>
            </li>
            
          </ul>
          <i className={`bi mobile-nav-toggle ${isNavCollapsed ? 'bi-list' : 'bi-x'}`} onClick={toggleNav}></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
