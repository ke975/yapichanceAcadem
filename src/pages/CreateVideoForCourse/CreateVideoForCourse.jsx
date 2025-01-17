import { Navbar } from '../../components/MenuUsers/Menu';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function CreateVideoForCourse() {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    descriptionVideo: '',
    sectionId: '', // Inicialmente vacío
  });

  const [sections, setSections] = useState([]); // Para almacenar las secciones
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Obtener las secciones disponibles desde el backend
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/section');
        console.log('Datos recibidos del backend:', response.data);
  
        // Asegurarse de que los datos contienen 'sections'
        if (response.data && Array.isArray(response.data.sections)) {
          setSections(response.data.sections); // Usar la propiedad sections del objeto
        } else {
          setErrorMessage('Las secciones no están en el formato esperado.');
        }
      } catch (error) {
        setErrorMessage('No se pudieron cargar las secciones');
      }
    };
  
    fetchSections();
  }, []);
  

  // Maneja el cambio de los valores en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Verifica si la URL de video tiene un formato correcto
  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de URL
    if (!validateUrl(formData.url)) {
      setErrorMessage('Por favor ingresa una URL válida de YouTube.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/Videos', formData);
      setSuccessMessage('Video creado correctamente');
      setErrorMessage('');
      // Resetea el formulario
      setFormData({
        title: '',
        url: '',
        descriptionVideo: '',
        sectionId: '', // Restablecer sectionId
      });
    } catch (error) {
      setErrorMessage('Error al crear el video');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <div className="container mt-5">
        <h2>Crear Nuevo Video</h2>

        {/* Mensajes de éxito o error */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título del Video</label>
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
            <label htmlFor="url" className="form-label">URL del Video</label>
            <input
              type="url"
              className="form-control"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descriptionVideo" className="form-label">Descripción del Video</label>
            <textarea
              className="form-control"
              id="descriptionVideo"
              name="descriptionVideo"
              value={formData.descriptionVideo}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

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
    {sections && sections.length > 0 ? (
      sections.map((section) => (
        <option key={section.id} value={section.id}>
          {section.title}
        </option>
      ))
    ) : (
      <option>No hay secciones disponibles</option>
    )}
  </select>
</div>

          <button type="submit" className="btn btn-primary">Guardar Video</button>
        </form>
      </div>
    </>
  );
}
