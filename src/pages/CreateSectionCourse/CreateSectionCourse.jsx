import {Navbar} from '../../components/MenuUsers/Menu'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function CreateSectionCourse(){

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        courseId: '', // Inicialmente vacío
      });

      const [courses, setCourses] = useState([]); // Para almacenar los cursos
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Obtener los cursos disponibles desde el backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/course');
        setCourses(response.data); // Guardar los cursos en el estado
      } catch (error) {
        setErrorMessage('No se pudieron cargar los cursos');
      }
    };

    fetchCourses();
  }, []);

  // Maneja el cambio de los valores en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/section', formData);
      setSuccessMessage('Sección creada correctamente');
      setErrorMessage('');
      // Resetea el formulario
      setFormData({
        title: '',
        content: '',
        courseId: '', // Restablecer courseId
      });
    } catch (error) {
      setErrorMessage('Error al crear la sección');
      setSuccessMessage('');
    }
  };

    return(
        <>
        <header>
          <Navbar/>
        </header>
        
        <div className="container mt-5">
      <h2>Crear Nuevo Módulo</h2>
      
      {/* Mensajes de éxito o error */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título del Módulo</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Contenido</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>

        {/* Selección del Curso */}
        <div className="mb-3">
          <label htmlFor="courseId" className="form-label">Selecciona un Curso</label>
          <select
            className="form-control"
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Guardar Sección</button>
      </form>
    </div>

        
        </>
    )
}