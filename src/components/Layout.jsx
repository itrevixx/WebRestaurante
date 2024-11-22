import { Link } from "react-router-dom";
import "./Layout.css";
import logo from "../assets/logo.png";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
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
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
