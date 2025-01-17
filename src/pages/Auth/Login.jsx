import {  useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redireccionar
import { useAuth } from "../../Context/AuthContext";

import Compu from "../../assets/laptop.png";
import Logo from "../../assets/Logo.png";

export function Login() {
  const { login, user } = useAuth(); // Asegúrate de que el contexto esté proporcionando la función 'login'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading ] = useState(false);
  const [error, setError] = useState(''); // Para almacenar el mensaje de error
  const navigate = useNavigate(); // Hook de redirección

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setLoading(true); // Mostrar el spinner
    setError(''); // Borrar el mensaje de error anterior

    try {
        // Intentar iniciar sesión utilizando la función del contexto
        await login(email, password);

        // Si la función `login` fue exitosa, redirigir al dashboard
        navigate('/dashboard');
    } catch (error) {
        // Detener el spinner si hubo un error
        setLoading(false); 
        
        // Mostrar el mensaje de error recibido
        setError(error.message || 'Hubo un error al intentar iniciar sesión');
    }
};



  return (
    <div style={{ backgroundColor: "#EBEFFF", height: "100vh", margin: "0", padding: "0" }}>
      <div className="container-fluid" style={{ padding: "0" }}>
        <div className="row no-gutters" style={{ margin: "0" }}>
          <div className="col-md-8 offset mt-5">
            <div className="text-center">
              <img src={Logo} className="img-fluid" width={300} alt="" />
            </div>

            <h2 className="mt-5 text-center">Bienvenido Semadd/Yapichance</h2>

            {/* Mostrar el mensaje de error si existe */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group mt-5 col-md-6 mx-auto">
                <label htmlFor="email" className="mb-3">Correo Electronico</label>
                <input
                  type="email"
                  className="form-control rounded-4"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-5 col-md-6 mx-auto">
                <label htmlFor="password" className="mb-3">Contraseña</label>
                <input
                  type="password"
                  className="form-control rounded-4"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-md-4 offset-md-1 mt-4 rounded-3 mx-auto">
                <button
                  type="submit"
                  className="btn btn col-md-12 rounded-3 text-white"
                  style={{ backgroundColor: "#656ED3" }}
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 ms-auto" style={{ height: "100vh", backgroundColor: "#AFB3FF" }}>
            <img src={Compu} className="img-fluid" alt="imagen de Computadores" />
            <p className="text-center mt-5">No tienes una cuenta? <a href="/signup">Regístrate aquí</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
