import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player'; // Reproductor multimedia
import {Navbar} from '../../components/MenuUsers/Menu'
import Footer from "../../components/Footer";
import {Link} from 'react-router-dom'

export function CourseVideos() {
  const { sectionId } = useParams(); // Obtener el id de la sección
  const [videos, setVideos] = useState([]); // Almacenaremos los videos
  const [selectedVideo, setSelectedVideo] = useState(null); // Video seleccionado para reproducir
  const [loading, setLoading] = useState(true); // Estado para saber si estamos cargando los datos
  const [tasks, setTasks] = useState([]); // Almacenaremos las tareas
  const [loadingTasks, setLoadingTasks] = useState(true); // Estado para saber si estamos cargando las tareas

  // Paginación
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const tasksPerPage = 2; // Tareas a mostrar por página

  // Calcular las tareas a mostrar en la página actual
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Función para cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Petición a la API para obtener los videos de la sección
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/Videos/section/${sectionId}`);
        if (response.data && Array.isArray(response.data.videos)) {
          setVideos(response.data.videos);
          if (response.data.videos.length > 0) {
            setSelectedVideo(response.data.videos[0].url);
          }
        } else {
          console.error('La respuesta no contiene un arreglo de videos:', response.data);
          setVideos([]);
        }
      } catch (error) {
        console.error('Error al obtener los videos', error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/Task/course/${sectionId}`);
        if (response.data && Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);
        } else {
          console.error('La respuesta no contiene un arreglo de tareas:', response.data);
          setTasks([]);
        }
      } catch (error) {
        console.error('Error al obtener las tareas', error);
        setTasks([]);
      } finally {
        setLoadingTasks(false);
      }
    };

    if (sectionId) {
      fetchVideos();
      fetchTasks();
    }
  }, [sectionId]);

  // Si está cargando, mostrar un mensaje
  if (loading || loadingTasks) return <div className="text-center mt-5">Cargando datos...</div>;

  // Si no se encuentran videos
  if (videos.length === 0) {
    return <div className="text-center mt-5">No se encontraron videos para esta sección.</div>;
  }

  // Calcular el total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (

    <>
    <header>
      <Navbar/>
    </header>
  
    <div className="container mt-5">
      <div className="row">
        {/* Columna para el reproductor multimedia */}
        <div className="col-lg-8 col-12">
      
          {selectedVideo && (
            <ReactPlayer
              url={selectedVideo} // URL del video seleccionado
              controls={true}
              width="100%"
              height="500px"
            />
          )}
        </div>

        {/* Columna para el acordeón de las secciones y lista de videos */}
        <div className="col-lg-4 col-12">
          <h3 className="mb-4"></h3>
          <div className="accordion border-0 shadow" id="accordionExample">
            {videos.map((video, index) => (
              <div key={video.id} className="accordion-item">
                <h2 className="accordion-header" id={`heading${video.id}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${video.id}`}
                    aria-expanded="true"
                    aria-controls={`collapse${video.id}`}
                    onClick={() => setSelectedVideo(video.url)} // Cambiar el video seleccionado cuando se hace clic en el título
                  >
                    {video.title}
                  </button>
                </h2>
                <div
                  id={`collapse${video.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${video.id}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>{video.descriptionVideo}</p>
                    <Link to="/UploadTask">Accese a la página para subir la Tarea </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna para las tareas del curso */}
        <div className="col-lg-12 col-12 mt-3 mb-5">
          <h6 className="mb-2">Tareas del Curso</h6>
          <div className="row">
            {currentTasks.length > 0 ? (
              currentTasks.map((task) => (
                <div key={task.id} className="col-lg-4 col-md-6 col-12 mb-4"  >
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <h5 className="card-title">{task.title}</h5>
                      <p className="card-text">Codigo de la Tarea del Curso <strong>{task.id}</strong> </p>
                      <p className="card-text">{task.content}</p>
                      <p className='card-text'> Codigo de tarea para Entreag en el de Material <strong> {task.codigoTask} </strong></p>
                      <a href={task.urlTask} target="_blank" rel="noopener noreferrer" >
                        {task.title}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron tareas para este curso.</p>
            )}
          </div>

          {/* Paginación */}
          <nav>
            <ul className="pagination justify-content-center">
              {pageNumbers.map((number) => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                  <button onClick={() => paginate(number)} className="page-link">
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <footer>
      <Footer/>
    </footer>
    </>
  );
}
