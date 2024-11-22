import Mapa from "../../components/Mapa";
import bodaexterior from "../../assets/boda-exterior.jpg";
import "./Events.css";

const navigateMenus = () => {
  navigate("/menus");
};
const Events = () => {
  return (
    <div className="events-container">
      <div className="events-image-container">
        <p>EVENTOS</p>
      </div>
      <p className="events-img-footer">
        Restaurante familiar y de eventos - Barcelona
      </p>
      <div className="events-row-img-left">
        <img src={bodaexterior} alt="Comedor de Mandarina" />
        <div className="events-col-right">
          <h1>BUSCAMOS QUE LOS INVITADOS VIVAN MOMENTOS ÚNICOS EN MANDARINA</h1>
          <h2>Vive una experiencia única</h2>
          <p>
            Nuestra masía es el lugar perfecto para una comunión, bautizo o boda
            en Barcelona. Cualquier evento será bienvenido y nos esforzaremos
            para que todo el grupo se sienta bien atendido por nuestro excelente
            personal de sala.
          </p>
          <button onClick={navigateMenus}>VER MENÚS</button>
        </div>
      </div>
      <Mapa />
    </div>
  );
};

export default Events;
