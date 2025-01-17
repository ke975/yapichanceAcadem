import React from 'react';
 import {Link} from "react-router-dom"
 import { useAuth } from "../../Context/AuthContext/";
 import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté importado
import Blanco from '../../assets/Blanco.png'; // El logo de la página


export const Navbar = () => {

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
  return (
    <>
<nav className="navbar navbar-expand-lg bg-primary">
  <div className="container">
    <a className="navbar-brand" href="#"><img src={Blanco} width={100} alt="" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/dashboard">Inicio </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">{user.name}</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cerrar Sesión 
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={handleLogout} href="#">Salir de la plataforma</a></li>
         
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
   
    </div>
  </div>
</nav>


   </>
  );
};
