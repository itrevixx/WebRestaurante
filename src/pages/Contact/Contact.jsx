import { useState } from "react";
import Mapa from "../../components/Mapa";
import Popup from "../../components/Popup/Popup";
import "./Contact.css";

const Contact = () => {
  // Definir el estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    privacy: false,
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    title: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validación personalizada para el email
  const validateEmail = (e) => {
    const emailField = e.target;
    const emailValue = emailField.value.trim(); // Asegurarse de que no tenga espacios en blanco
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validar si el campo está vacío
    if (!emailValue) {
      emailField.setCustomValidity("Introduce un email");
    }
    // Validar formato del email
    else if (!emailRegex.test(emailValue)) {
      emailField.setCustomValidity("Introduce un email válido");
    }
    // Si es válido, limpiar cualquier mensaje de error
    else {
      emailField.setCustomValidity("");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const object = {
      ...formData,
      access_key: "8d2de2e0-9221-4c06-9cda-10d6bbc9fd3c",
    };
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

      // Solo mostramos el popup de éxito si la respuesta es exitosa
      if (res.success) {
        setPopup({
          show: true,
          title: "¡Gracias por ponerte en contacto con nosotros!",
          message: "Nos pondremos en contacto contigo lo antes posible.",
          type: "success",
        });

        // Resetear los campos del formulario
        setFormData({
          name: "",
          email: "",
          message: "",
          privacy: false,
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: "", title: "", type: "" });
  };

  return (
    <div className="contact-container">
      {popup.show && (
        <Popup
          message={popup.message}
          onClose={handleClosePopup}
          title={popup.title} // Aquí se pasa el título personalizado
          type={popup.type}
        />
      )}
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
            value={formData.name}
            onChange={handleInputChange}
            onInput={(e) => e.target.setCustomValidity("")} // Resetea cualquier mensaje de error anterior
            onInvalid={(e) =>
              e.target.setCustomValidity("El nombre es obligatorio")
            }
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            value={formData.email}
            onChange={handleInputChange}
            onInput={(e) => validateEmail(e)} // Valida en cada cambio de entrada.
            onInvalid={(e) => {
              validateEmail(e); // Validar y establecer mensaje personalizado
            }}
            required // Esto asegura que el navegador considere el campo obligatorio
          />

          <textarea
            name="message"
            placeholder="Mensaje"
            className="form-textarea"
            value={formData.message}
            onChange={handleInputChange}
            onInput={(e) => e.target.setCustomValidity("")} // Resetea cualquier mensaje de error anterior
            onInvalid={(e) =>
              e.target.setCustomValidity("Introduce un mensaje")
            }
            required
          ></textarea>
          <div className="form-checkbox-container">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              className="form-checkbox"
              checked={formData.privacy}
              onChange={handleInputChange}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Debes aceptar nuestra política de privacidad"
                )
              }
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
