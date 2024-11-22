import Mapa from "../../components/Mapa";
import "./Contact.css";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Incluye tu access_key proporcionada por Web3Forms
    formData.append("access_key", "8d2de2e0-9221-4c06-9cda-10d6bbc9fd3c");

    // Convierte los datos a un objeto JSON
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      // Muestra un mensaje de éxito o error
      if (res.success) {
        alert("¡Mensaje enviado exitosamente!");
      } else {
        alert(
          "Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente."
        );
      }
    } catch (error) {
      alert("Error al enviar el formulario. Por favor, verifica tu conexión.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-image-container">
        <p>RESTAURANTE MASIA MANDARINA</p>
      </div>
      <div className="form">
        <h1>¿ALGUNA DUDA?</h1>
        <h2>Rellena nuestro formulario o llámanos</h2>
        <h3>Whatsapp: (+34) 652-864-950</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="form-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            required
          />
          <textarea
            name="message"
            placeholder="Mensaje"
            className="form-textarea"
            required
          ></textarea>
          <div className="form-checkbox-container">
            <input
              type="checkbox"
              id="privacy"
              className="form-checkbox"
              required
            />
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
