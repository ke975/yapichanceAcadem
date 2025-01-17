import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {Navbar} from '../../components/MenuUsers/Menu'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Footer from "../../components/Footer";

export function CourseDetails() {
  const { id } = useParams(); // Obtiene el ID del curso desde la URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Petición a la API para obtener los detalles del curso
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/course/${id}`);
        setCourse(response.data); // Asigna los datos del curso
      } catch (error) {
        console.error('Error al obtener los detalles del curso', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]); // Se ejecutará cada vez que el ID cambie

  // Si está cargando, mostrar un mensaje
  if (loading) return <div className="text-center mt-5">Cargando detalles del curso...</div>;

  // Si no se encuentran datos del curso o secciones
  if (!course) {
    return <div className="text-center mt-5">No se encontraron detalles para este curso.</div>;
  }

  return (

    <>
<header>
  <Navbar/>
</header>
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Detalles del curso en una tarjeta */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 rounded-4 mb-4">
            {course.image && (
              <img
                src={course.image}
                alt={course.name}
                className="card-img-top rounded-4"
                style={{ objectFit: 'cover', height: '300px' }}
              />
            )}
            <div className="card-body">
              <h2 className="card-title text-dark fw-bold">{course.name}</h2>
              <p className="card-text text-muted">{course.description}</p>
            </div>
          </div>
        </div>

        {/* Secciones del curso */}
        <div className="col-md-6 offset-2">
          <h3 className="mb-4 text-dark">Modulos</h3>
          {course.sections && course.sections.length > 0 ? (
            course.sections.map((section) => (
              <div className="card col-md-8 mb-4 shadow-sm border-0 rounded-4" key={section.id}>
                <div className="card-body">
                  <h5 className="card-title text-primary">{section.title}</h5>
                  <p className="card-text text-muted">{section.content}</p>
                  {/* Botón para redirigir a la página de videos de la sección */}
                  <Link
                    to={`/curso/${id}/videos/${section.id}`}
                    className="btn btn-outline-primary rounded-pill w-100"
                  >
                    Ver videos
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron secciones para este curso.</p>
          )}
        </div>
      </div>
      
    </div>
    
    <footer>
      <Footer/>
    </footer>


    </>
  );
}
