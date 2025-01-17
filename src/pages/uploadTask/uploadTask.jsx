import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/MenuUsers/Menu';
import Footer from "../../components/Footer";

export const UploadTask = () => {
  const [taskId, setTaskId] = useState('');
  const [codigoTask, setcodigoTask] = useState('')
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Llamada a la API para obtener los cursos
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/course'); // Cambia la URL si es necesario
        setCourses(response.data);
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
        setError('Hubo un error al obtener los cursos.');
      }
    };

    fetchCourses();
  }, []);

  // Manejador para el archivo seleccionado
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Manejador para el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskId || !studentId || !courseId || !file || !codigoTask) {
      setError('Por favor, completa todos los campos y selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('taskId', taskId);
    formData.append('studentId', studentId);
    formData.append('courseId', courseId);   
    formData.append('codigoTask', codigoTask); // Usando el valor seleccionado del dropdown
    formData.append('file', file);

    try {
      // Enviar la solicitud POST para subir la tarea
      const response = await axios.post(
        'http://localhost:3000/api/Task/upload/task-submissions', // Cambia la URL si es necesario
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccessMessage('La tarea fue subida con éxito.');
      setError('');
      // Limpiar el formulario
      setTaskId('');
      setStudentId('');
      setCourseId('');
      setcodigoTask('')
      setFile(null);
    } catch (error) {
      console.error('Error al subir la tarea:', error);
      setError('Hubo un error al subir la tarea. Intenta nuevamente.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container mt-5 mb-5">
        <h2>Subir Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="taskId">CodigoIdSecuenciaTarea</label>
            <input
              type="text"
              className="form-control"
              id="taskId"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            />
          </div>
          

          <div className="form-group mb-3">
            <label htmlFor="codigoTask">Código de la Tarea:</label>
            <input
              type="text"
              className="form-control"
              id="codigoTask"
              value={codigoTask}
              onChange={(e) => setcodigoTask(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="studentId">Código del Estudiante:</label>
            <input
              type="text"
              className="form-control"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="courseId">Selecciona el Curso:</label>
            <select
              className="form-control"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">Seleccione un curso</option>
              {courses.length > 0 ? (
                courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))
              ) : (
                <option value="">No hay cursos disponibles</option>
              )}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="file">Subir Archivo de la Tarea Correspondiente:</label>
            <input
              type="file"
              className="form-control"
              id="file"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Subir Tarea
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
