import { Link } from "react-router-dom";
import "./Layout.css"; // Asegúrate de que la ruta sea correcta

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li className="logo">
            <h1>MANDARINA</h1>
          </li>
          <div className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/reservas">Reservas</Link>
            </li>
          </div>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
