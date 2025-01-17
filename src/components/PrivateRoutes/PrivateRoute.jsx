// src/components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/";

const PrivateRoute = ({ element }) => {
    const { user, token } = useAuth(); // Obtenemos el usuario y el token del contexto

  if (!user || !token) {
    // Si no hay usuario o token, redirigimos al login
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
