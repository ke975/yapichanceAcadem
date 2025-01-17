import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Importa Link de react-router-dom
import '../assets/css/Portfolio.css';  // Asegúrate de tener estilos bonitos para las tarjetas

export function Portfolio() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

    // Cargar los cursos desde la API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/course');
        setCourses(response.data);
      } catch (error) {
        console.error('Error al obtener los cursos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2 className='mt-5 text-center'>Cursos</h2>
            <p>En el Centro de Educación Continua Yapichance, ofrecemos cursos que cubren una amplia variedad de áreas. Aprende las habilidades más demandadas del mercado.</p>
          </div>

          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : (
            <div className="row portfolio-container">
              {courses.map((course) => (
                <div className={`col-lg-4 col-md-6 portfolio-item`} data-aos="fade-up" data-aos-duration="1000" key={course.id}>
                  <div className="card shadow border-0">
                    <img src={course.image} className="card-img-top border-0 " width={100} alt={course.title}  />
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.description}</p>
                      <p className="category">{course.category}</p>
                      {/* Reemplaza el <a> por <Link> */}
                      <Link to={`/curso/${course.id}`} className="btn btn-primary" title="Ver detalles">Ver detalles</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
