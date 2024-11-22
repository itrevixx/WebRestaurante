import Mapa from "../../components/Mapa";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-image-container">
        <p>RESTAURANTE MASIA MANDARINA</p>
      </div>
      <div className="form">
        <h1>¿ALGUNA DUDA?</h1>
        <h2>Rellena nuestro formulario o llámanos</h2>
        <h3>Whatsapp: (+34) 652-864-950</h3>
        <form>
          <input type="text" placeholder="Nombre" className="form-input" />
          <input type="email" placeholder="Email" className="form-input" />
          <textarea placeholder="Mensaje" className="form-textarea"></textarea>
          <div className="form-checkbox-container">
            <input type="checkbox" id="privacy" className="form-checkbox" />
            <label htmlFor="privacy">
              He leído y acepto la política de privacidad
            </label>
          </div>
          <button type="submit" className="form-button">
            ENVIAR
          </button>
        </form>
      </div>
      <Mapa />
    </div>
  );
};

export default Contact;
