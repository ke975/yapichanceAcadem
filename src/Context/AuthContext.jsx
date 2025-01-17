// src/Context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Recuperar usuario y token desde localStorage al cargar el componente
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      // Verificar si savedUser es un valor válido antes de parsear
      if (savedUser && savedUser !== 'undefined') {
        return JSON.parse(savedUser);  // Intentar parsear el valor si existe
      }
      return null;  // Si no existe, devolver null
    } catch (error) {
      console.error("Error al parsear el usuario de localStorage:", error);
      return null;  // Devolver null si ocurre un error al parsear
    }
  });

  const [token, setToken] = useState(() => {
    // Recuperar el token de localStorage y manejar posibles errores
    try {
      const savedToken = localStorage.getItem('token');
      return savedToken || ''; // Si no hay token, devolver un valor vacío
    } catch (error) {
      console.error("Error al recuperar el token de localStorage:", error);
      return ''; // Si hay error, devolver un valor vacío
    }
  });

  // Configurar el token en los headers de axios cuando se cambie el token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization']; // Eliminar si no hay token
    }
  }, [token]);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      const { token, user } = response.data;

      // Verificar si la respuesta contiene un token y un usuario
      if (token && user) {
        // Guardar el token y el usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Actualizar el estado con el token y el usuario
        setToken(token);
        setUser(user);

        alert(response.data.message || "Inicio de sesión exitoso"); // Feedback al usuario
      } else {
        // Si no se recibe un token o un usuario, lanzar un error
        throw new Error('No se pudo recuperar el token o el usuario desde la respuesta');
      }
    } catch (error) {
      // Si hay un error (como credenciales incorrectas), lanzamos el error para que `handleSubmit` lo maneje
      console.error("Error al iniciar sesión:", error);
      throw new Error(error.response?.data?.message || 'Hubo un error al iniciar sesión');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
