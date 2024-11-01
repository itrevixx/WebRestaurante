// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import imgcomedor2 from "../../assets/imgcomedor2.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reservas");
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <p>
          Ven y descubre la esencia de nuestra cocina en Mandarina. ¡Te
          esperamos!
        </p>
      </div>
      <div className="row-img-left">
        <img src={imgcomedor2} alt="Comedor de Mandarina" />{" "}
        {/* Cambiado aquí */}
        <button onClick={handleClick}>HAZ TU RESERVA</button>
      </div>
      <div className="footer">
        <p>Mandarina</p>
        <p>Av. Campo 5, Barcelona </p>
        <p>Horario: Lunes a Viernes de 13:00 a 18:00</p>
        <p>Whatsapp: (+34) 652-864-950</p>
        <p>Instagram: @mandarina</p>
        <p>© 2024 Mandarina. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default Home;
