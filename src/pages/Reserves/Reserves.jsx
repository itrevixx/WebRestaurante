import { useEffect, useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css";
import CalendarComp from "../../components/CalendarComp/CalendarComp";
import { isToday, isAfter, addMinutes, set } from "date-fns";

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
      const selectedDate = formData.date;
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
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de adultos y niños
    if (formData.adultsCounter <= 0 && formData.kidsCounter <= 0) {
      // Si no hay adultos ni niños, mostrar el error
      const adultsInput = document.getElementById("adults-input");
      const kidsInput = document.getElementById("kids-input");

      // Establecer custom validity en los inputs de adultos y niños
      adultsInput.setCustomValidity(
        "Número de personas obligatorio para la reserva"
      );
      kidsInput.setCustomValidity(
        "Número de personas obligatorio para la reserva"
      );

      // Mostrar el mensaje de error
      adultsInput.reportValidity(); // Esto mostrará el mensaje de error
      kidsInput.reportValidity();

      return; // Detener el envío del formulario si no hay adultos ni niños
    } else {
      // Restablecer custom validity si los valores son válidos
      const adultsInput = document.getElementById("adults-input");
      const kidsInput = document.getElementById("kids-input");
      adultsInput.setCustomValidity("");
      kidsInput.setCustomValidity("");
    }

    // Validación de otros campos (como fecha, teléfono, email)
    const dateInput = document.getElementById("date-input");

    if (dateInput) {
      if (!formData.date) {
        dateInput.setCustomValidity("Por favor, selecciona una fecha.");
        dateInput.reportValidity(); // Mostrar el mensaje de error
        return; // Detener el envío del formulario si no se selecciona una fecha
      } else {
        dateInput.setCustomValidity(""); // Restablecer el mensaje de error si la fecha es válida
      }
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

  useEffect(() => {
    // Solo se ejecuta si los valores de los contadores cambian
    const adultsInput = document.getElementById("adults-input");
    const kidsInput = document.getElementById("kids-input");

    if (formData.adultsCounter > 0 || formData.kidsCounter > 0) {
      // Si hay adultos o niños, restablecer el mensaje de error
      adultsInput.setCustomValidity("");
      kidsInput.setCustomValidity("");
    }
  }, [formData.adultsCounter, formData.kidsCounter]); // Dependencia de los contadores

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
            id="adults-input"
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
            id="kids-input"
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

        {/* Otros campos */}
        <input
          type="text"
          name="name"
          id="name"
          className="input-field"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
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
          required
        />

        <CalendarComp
          date={formData.date}
          setDate={(date) => setFormData((prev) => ({ ...prev, date }))}
          required
        />

        <select
          className="select-field"
          value={formData.time}
          name="time"
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona una hora</option>
          {filteredTimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button type="submit" className="reserve-button">
          Reservar
        </button>
      </form>
    </div>
  );
};

export default Reserves;
