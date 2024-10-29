// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reservas");
  };

  return (
    <>
      <div className="home-container">
        <p>
          Ven y descubre la esencia de nuestra cocina en Mandarina. ¡Te
          esperamos!
        </p>
        <button onClick={handleClick}>HAZ TU RESERVA</button>
      </div>
      <div className="menu-container">
        <div className="menu">
          <h2>Menu Entresemana</h2>
          <h3>Primeros</h3>
          <div className="menu-list-container">
            <ul className="menu-list">
              <li>Ensalada César</li>
              <li>Sopa de Calabaza</li>
              <li>Risotto de Setas</li>
              <li>Tortilla Española</li>
              <li>Pasta al Pesto</li>
            </ul>
            <ul className="menu-list">
              <li>Crema de Espárragos</li>
              <li>Gazpacho Andaluz</li>
              <li>Croquetas de Jamón</li>
              <li>Quiche de Verduras</li>
              <li>Albóndigas en Salsa</li>
            </ul>
          </div>
          <h3>Segundo</h3>
          <div className="menu-list-container">
            <ul className="menu-list">
              <li>Pescado a la Plancha</li>
              <li>Pollo al Ajillo</li>
              <li>Carne Asada</li>
              <li>Berenjenas Rellenas</li>
              <li>Tacos de Carnitas</li>
            </ul>
            <ul className="menu-list">
              <li>Estofado de Ternera</li>
              <li>Salmón al Horno</li>
              <li>Lasaña de Carne</li>
              <li>Pasta con Salsa de Tomate</li>
              <li>Pizza Margarita</li>
            </ul>
          </div>
          <ul>
            <h3>Postres</h3>
            <li>Tarta de Chocolate</li>
            <li>Flan de Caramelo</li>
            <li>Tiramisu</li>
            <li>Cheesecake de Fresas</li>
            <li>Panna Cotta de Vainilla</li>
          </ul>
          <br />
          <p>*Bebida y cafe incluídos</p>
        </div>
      </div>
      <div className="footer">
        <p>Mandarina</p>
        <p>Av. Campo 5, Barcelona </p>
        <p>Horario: Lunes a Viernes de 13:00 a 18:00</p>
        <p>Whatsapp: (+34) 652-864-950</p>
        <p>Instagram: @mandarina</p>
        <p>© 2024 Mandarina. Todos los derechos reservados.</p>
      </div>
    </>
  );
};

export default Home;
