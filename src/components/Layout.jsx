import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { logout } from "../app/services/api/logout";
import { FaUserAlt } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [admin, setAdmin] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("username");
      setAdmin("");
      navigate("/");
    } catch (error) {
      console.error("Error al hacer logout", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Alterna el estado del dropdown
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div onClick={closeDropdown}>
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
          {admin && (
            <li className="dropdown">
              <span
                className="dropdown-toggle"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el evento cierre el dropdown
                  toggleDropdown();
                }}
              >
                {admin}
              </span>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/panel">PANEL</Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout}>LOGOUT</Link>
                  </li>
                </ul>
              )}
            </li>
          )}
          {!admin && (
            <li>
              <Link to="/login">
                <FaUserAlt />
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
