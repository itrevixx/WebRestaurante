import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { logout } from "../app/services/api/logout";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Función para actualizar el estado con el username desde localStorage
    const fetchAdmin = () => {
      const storedAdmin = localStorage.getItem("username");
      const storedAdminUpperCase = storedAdmin
        ? storedAdmin.toUpperCase()
        : null;
      if (storedAdmin) {
        setAdmin(storedAdminUpperCase);
      } else {
        setAdmin("");
      }
    };

    fetchAdmin();

    const intervalId = setInterval(() => {
      fetchAdmin();
    }, 100);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para manejar el logout
  const handleLogout = async () => {
    try {
      await logout(); // Realiza la solicitud de logout
      localStorage.removeItem("username"); // Elimina el username de localStorage
      setAdmin(""); // Actualiza el estado para reflejar el logout
      navigate("/"); // Redirige al login después del logout
    } catch (error) {
      console.error("Error al hacer logout", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response);
      } else {
        console.error("Error inesperado:", error.message);
      }
    }
  };

  return (
    <div>
      <nav>
        <div className="logo-container">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">INICIO</Link>
          </li>
          <li>
            <Link to="/menus">MENUS</Link>
          </li>
          <li>
            <Link to="/events">BODAS Y EVENTOS</Link>
          </li>
          <li>
            <Link to="/reserves">RESERVAR</Link>
          </li>
          <li>
            <Link to="/contact">CONTACTO</Link>
          </li>
          {admin && ( // Solo mostrar el enlace si el usuario está autenticado
            <li>
              <Link to="/panel">PANEL CONTROL</Link>
            </li>
          )}
          <li>
            <a href="#">{admin}</a>
          </li>
          {admin && (
            <li>
              <button onClick={handleLogout}>LOGOUT</button>
            </li>
          )}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
