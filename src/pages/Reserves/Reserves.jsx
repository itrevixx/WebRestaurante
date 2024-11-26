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
    date: new Date(),
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
      if (isToday(formData.date)) {
        const validTimes = times.filter((time) => {
          const [hour, minute] = time.split(":").map(Number);
          const selectedDateTime = set(formData.date, {
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
    const phoneRegex = /^\d{9}$/;

    if (!phoneField.value) {
      phoneField.setCustomValidity("Es necesario introducir un teléfono");
    } else {
      phoneField.setCustomValidity(
        phoneRegex.test(phoneField.value)
          ? "" // Número válido
          : "Introduce un teléfono válido de 9 dígitos"
      );
    }
  };

  const validateEmail = (e) => {
    const emailField = e.target;
    const emailValue = emailField.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/;

    if (!emailValue) {
      emailField.setCustomValidity("Introduce un email");
    } else if (!emailRegex.test(emailValue)) {
      emailField.setCustomValidity("Introduce un email válido");
    } else {
      emailField.setCustomValidity("");
    }
  };

  const validateCounters = () => {
    const adultsCounterValid = formData.adultsCounter > 0;
    const kidsCounterValid = formData.kidsCounter > 0;

    if (!adultsCounterValid && !kidsCounterValid) {
      document
        .getElementById("adultsCounter")
        .setCustomValidity(
          "Es necesario introducir al menos un adulto o un niño."
        );
      document
        .getElementById("kidsCounter")
        .setCustomValidity(
          "Es necesario introducir al menos un adulto o un niño."
        );
    } else {
      document.getElementById("adultsCounter").setCustomValidity("");
      document.getElementById("kidsCounter").setCustomValidity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateCounters();

    const form = e.target;
    if (!form.checkValidity()) {
      return;
    }

    try {
      const createdClient = await createClient({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });

      const clientId = createdClient.data.id;

      await createReserve({
        reservationDate: formData.date,
        reservationTime: formData.time,
        adults: formData.adultsCounter,
        children: formData.kidsCounter,
        user: { id: clientId },
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        date: new Date(),
        time: "",
        adultsCounter: 0,
        kidsCounter: 0,
      });

      setPopupMessage("Reserva realizada con éxito.");
      setPopupType("success");
      setShowPopup(true);
    } catch (error) {
      setPopupMessage(
        error.message.includes("Network Error")
          ? "Hubo un error de red. Intenta nuevamente."
          : "Hubo un error al hacer la reserva. Intenta nuevamente."
      );
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
            id="adultsCounter"
            name="adultsCounter"
            value={formData.adultsCounter}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                adultsCounter: Number(e.target.value),
              }))
            }
            onInput={validateCounters}
            required
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
            id="kidsCounter"
            name="kidsCounter"
            value={formData.kidsCounter}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                kidsCounter: Number(e.target.value),
              }))
            }
            onInput={validateCounters}
            required
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
          className="input-field"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="tel"
          maxLength={9}
          name="phone"
          className="input-field"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleInputChange}
          onInput={validatePhone}
          required
        />
        <input
          type="email"
          name="email"
          className="input-field"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          onInput={validateEmail}
          required
        />

        <CalendarComp
          date={formData.date}
          setDate={(date) => setFormData((prev) => ({ ...prev, date }))}
        />

        <select
          className="select-field"
          value={formData.time}
          onChange={handleInputChange}
          name="time"
          required
        >
          <option value="">Seleccionar Hora</option>
          {filteredTimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button type="submit" className="form-button">
          Reservar
        </button>
      </form>

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          type={popupType}
        />
      )}
    </div>
  );
};

export default Reserves;
