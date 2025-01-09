import { useEffect, useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css";
import CalendarComp from "../../components/CalendarComp/CalendarComp";
import { isToday, isAfter, addMinutes, set } from "date-fns";
import Popup from "../../components/Popup/Popup";

const Reserves = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    adultsCounter: 0,
    kidsCounter: 0,
  });
  const [filteredTimes, setFilteredTimes] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const times = [
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  useEffect(() => {
    const filterTimes = () => {
      const now = new Date();
      const selectedDate = formData.date; // Usa formData.date
      if (isToday(selectedDate)) {
        const validTimes = times.filter((time) => {
          const [hour, minute] = time.split(":").map(Number);
          const selectedDateTime = set(selectedDate, {
            hours: hour,
            minutes: minute,
          });
          return isAfter(selectedDateTime, addMinutes(now, 30));
        });
        setFilteredTimes(validTimes);
      } else {
        setFilteredTimes(times);
      }
    };
    filterTimes();
  }, [formData.date]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validatePhone = (e) => {
    const phoneField = e.target;
    const phoneRegex = /^\d{9}$/; // Solo permite exactamente 9 dígitos

    if (!phoneField.value.trim()) {
      phoneField.setCustomValidity("Es necesario introducir un teléfono");
    } else if (!phoneRegex.test(phoneField.value)) {
      phoneField.setCustomValidity("Introduce un teléfono válido de 9 dígitos");
    } else {
      phoneField.setCustomValidity("");
    }
  };

  const validateEmail = (e) => {
    const emailField = e.target;
    const emailValue = emailField.value.trim(); // Asegurarse de que no tenga espacios en blanco
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailValue) {
      emailField.setCustomValidity("Introduce un email");
    } else if (!emailRegex.test(emailValue)) {
      emailField.setCustomValidity("Introduce un email válido");
    } else {
      emailField.setCustomValidity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el elemento de la fecha
    const dateInput = document.getElementById("date-input");

    if (dateInput) {
      // Validar si la fecha está seleccionada
      if (!formData.date) {
        dateInput.setCustomValidity("Por favor, selecciona una fecha.");
        dateInput.reportValidity(); // Esto muestra el mensaje de error
        return; // No continúa con la reserva si no hay fecha seleccionada
      } else {
        dateInput.setCustomValidity(""); // Resetea el mensaje de error si la fecha es válida
      }
    } else {
      // Asegurarse de que el campo de fecha está disponible
      console.error("El campo de fecha no fue encontrado");
    }

    try {
      // Crear cliente
      const createdClient = await createClient({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });

      const clientId = createdClient.data.id;

      // Crear reserva
      await createReserve({
        reservationDate: formData.date,
        reservationTime: formData.time,
        adults: formData.adultsCounter,
        children: formData.kidsCounter,
        user: { id: clientId },
      });

      // Limpiar formulario
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: null,
        time: "",
        adultsCounter: 0,
        kidsCounter: 0,
      });
    } catch (error) {
      const errorMessage = error.message.includes("Network Error")
        ? "Hubo un error de red. Intenta nuevamente."
        : "Hubo un error al procesar la reserva. Intenta nuevamente.";

      setPopupMessage(errorMessage);
      setPopupType("error");
      setShowPopup(true);
    }
  };

  return (
    <div className="reserve-container">
      <form className="reserve-form" onSubmit={handleSubmit}>
        <h2>Reserva una Mesa</h2>
        <h3>Adultos</h3>
        <div className="counter-group">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                adultsCounter: Math.max(0, prev.adultsCounter - 1),
              }))
            }
          >
            -
          </button>
          <input
            type="number"
            className="adultsCounter"
            value={formData.adultsCounter}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                adultsCounter: Number(e.target.value),
              }))
            }
          />
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                adultsCounter: prev.adultsCounter + 1,
              }))
            }
          >
            +
          </button>
        </div>
        <h3>Niños</h3>
        <div className="counter-group">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                kidsCounter: Math.max(0, prev.kidsCounter - 1),
              }))
            }
          >
            -
          </button>
          <input
            type="number"
            className="kidsCounter"
            value={formData.kidsCounter}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                kidsCounter: Number(e.target.value),
              }))
            }
          />
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                kidsCounter: prev.kidsCounter + 1,
              }))
            }
          >
            +
          </button>
        </div>

        <input
          type="text"
          name="name"
          id="name"
          className="input-field"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          onInput={(e) => e.target.setCustomValidity("")}
          onInvalid={(e) =>
            e.target.setCustomValidity("El nombre es obligatorio")
          }
          required
        />

        <input
          type="tel"
          name="phone"
          id="phone"
          className="input-field"
          placeholder="Teléfono"
          maxLength={9}
          value={formData.phone}
          onChange={handleInputChange}
          onInput={validatePhone}
          onInvalid={validatePhone}
          required
        />

        <input
          type="email"
          name="email"
          id="email"
          className="input-field"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          onInput={validateEmail}
          onInvalid={validateEmail}
          required
        />
        <CalendarComp
          date={formData.date}
          setDate={(date) => setFormData((prev) => ({ ...prev, date }))}
          onChange={handleInputChange}
          required
        />

        <select
          className="select-field"
          value={formData.time}
          name="time"
          onChange={handleInputChange}
          onInput={(e) => e.target.setCustomValidity("")}
          onInvalid={(e) =>
            e.target.setCustomValidity("Selecciona la hora de la reserva")
          }
          required
        >
          <option value="">Selecciona una hora</option>
          {filteredTimes.map((time, index) => (
            <option key={index} value={time} id="time">
              {time}
            </option>
          ))}
        </select>

        <button type="submit" className="reserve-button">
          Reservar
        </button>
      </form>

      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Reserves;
