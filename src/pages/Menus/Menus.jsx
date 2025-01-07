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
          <a
            href="/public/menus/Carta Los Caracoles 2024 Castellano.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>LA CARTA</li>
          </a>
          <a
            href="/public/menus/Menu del dia (L-V) 2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>MENÚ</li>
          </a>
          <a
            href="/public/menus/Menus Grupos Mediodia 2024 CASTELLANO.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>MENÚ PARA GRUPOS 1</li>
          </a>
          <a
            href="/public/menus/Menus Grupos Mediodia 2024 CASTELLANO.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>MENÚ PARA GRUPOS 2</li>
          </a>
          <a
            href="/public/menus/Menus Grupos Mediodia 2024 CASTELLANO.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>MENÚ PARA BODAS</li>
          </a>
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
