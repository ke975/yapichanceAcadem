import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // I
import {Navbar} from '../../components/MenuUsers/Menu'

export const CreateCourse = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    roleId: '', // Inicializamos como cadena
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Obtener los roles del servidor
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/roles/roles');
        setRoles(response.data);  // Guardar los roles en el estado
      } catch (error) {
        setErrorMessage('Error al obtener los roles');
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roleId') {
      // Convertir el roleId a entero al cambiar el select
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value), // Convertir a entero
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      name: formData.name,
      description: formData.description,
      image: formData.image,  // Enviar la URL de la imagen
      roleId: formData.roleId, // Asegurarse de que el roleId es un número
    };

    try {
      const response = await axios.post('http://localhost:3000/api/course', formDataToSend, {
        headers: {
          'Content-Type': 'application/json', // Enviar en formato JSON
        },

      });

      setSuccessMessage(response.data.message);
      setErrorMessage('');
      

    } catch (error) {
      setErrorMessage(error.response.data.message || 'Error al crear el curso');
      setSuccessMessage('');
    }
  };

  return (

    <>
     <header>
          <Navbar/>
        </header>
        <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Crear Nuevo Curso</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="courseName">Nombre del Curso</label>
              <input
                type="text"
                className="form-control"
                id="courseName"
                placeholder="Ingrese el nombre del curso"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="courseDescription">Descripción</label>
              <textarea
                className="form-control"
                id="courseDescription"
                rows="3"
                placeholder="Ingrese una breve descripción del curso"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="courseImage">URL de la Imagen del Curso</label>
              <input
                type="text"
                className="form-control"
                id="courseImage"
                placeholder="Ingrese la URL de la imagen"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="roleId">Rol del Profesor</label>
              <select
                className="form-control"
                id="roleId"
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un profesor</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}  {/* Mostrar el nombre del rol */}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-4 w-100">
              Crear Curso
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
   
  );
};
