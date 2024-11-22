import Mapa from "../../components/Mapa";
import "./Menus.css";

const Menus = () => {
  return (
    <div className="menus-container">
      <div className="menu-image-container">
        <p>NUESTROS MENÚS</p>
      </div>
      <p className="img-footer">
        Restaurante familiar y de eventos - Barcelona
      </p>
      <div className="menus-links">
        <ul className="menus-list">
          {/* FALTA AÑADIR LOS PDFS A LOS BOTONES */}
          <li>
            <a href="/menus">LA CARTA</a>
          </li>
          <li>
            <a href="/menus">MENÚ</a>
          </li>
          <li>
            <a href="/menus">MENÚ PARA GRUPOS 1</a>
          </li>
          <li>
            <a href="/menus">MENÚ PARA GRUPOS 2</a>
          </li>
          <li>
            <a href="/menus">MENÚ PARA BODDAS</a>
          </li>
        </ul>
      </div>
      <Mapa />
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

export default Menus;
