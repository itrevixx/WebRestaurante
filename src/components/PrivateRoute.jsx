import { Navigate } from "react-router-dom";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return localStorage.getItem("username") !== null;
};

// Componente que renderiza el contenido de la ruta solo si el usuario está autenticado
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
