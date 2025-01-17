import { Navbar } from '../../components/MenuUsers/Menu'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CreateTaskForCourse() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    urlTask: '',
    courseId: '', // Inicialmente vacío
    sectionId: '',
    codigoTask: ''
     // Añadimos la sección
  });

  const [courses, setCourses] = useState([]); // Para almacenar los cursos
  const [sections, setSections] = useState([]); // Para almacenar las secciones del curso seleccionado
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

  // Obtener las secciones de un curso cuando se selecciona un curso
  const fetchSections = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/section/course/${courseId}`);
      if (response.data && response.data.sections) {
        setSections(response.data.sections); // Guardar las secciones en el estado
      } else {
        setSections([]); // Si no hay secciones, limpiarlas
      }
    } catch (error) {
      setErrorMessage('No se pudieron cargar las secciones');
    }
  };

  // Maneja el cambio de los valores en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Si se cambia el curso, actualizar las secciones disponibles
    if (name === 'courseId') {
      fetchSections(value);
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verifica si el courseId es un número válido
    if (isNaN(parseInt(formData.courseId, 10))) {
      setErrorMessage('El curso seleccionado no es válido.');
      return;
    }
  
    console.log('Form Data:', formData); // Verifica el contenido de formData
  
    try {
      const response = await axios.post('http://localhost:3000/api/Task', formData);
      setSuccessMessage('Tarea creada correctamente');
      setErrorMessage('');
      setFormData({
        title: '',
        content: '',
        urlTask: '',
        courseId: '', 
        codigoTask: ''// Restablecer courseId
      });
    } catch (error) {
      setErrorMessage('Error al crear la tarea');
      setSuccessMessage('');
    }
  };
  

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container mt-5">
        <h2>Crear Nueva Tarea</h2>

        {/* Mensajes de éxito o error */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título de la Tarea</label>
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

          <div className="mb-3">
            <label htmlFor="content" className="form-label">Codigo de la Clase </label>
            <input
              className="form-control"
              id="codigoTask"
              name="codigoTask"
              value={formData.codigoTask}
              onChange={handleChange}
            
              required
            />
          </div>


          <div className="mb-3">
            <label htmlFor="urlTask" className="form-label">URL de la Tarea</label>
            <input
              type="url"
              className="form-control"
              id="urlTask"
              name="urlTask"
              value={formData.urlTask}
              onChange={handleChange}
              required
            />
          </div>

          {/* Selección del Curso */}
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


          {/* Selección de la Sección */}
          <div className="mb-3">
            <label htmlFor="sectionId" className="form-label">Selecciona una Sección</label>
            <select
  className="form-control"
  id="sectionId"
  name="sectionId"
  value={formData.sectionId}
  onChange={handleChange}
  required
>
  <option value="">Selecciona una sección</option>
  {sections.map((section) => (
    <option key={section.id} value={section.id}>
      {section.title}
    </option>
  ))}
</select>

          </div>

          <button type="submit" className="btn btn-primary">Guardar Tarea</button>
        </form>
      </div>
    </>
  );
}
