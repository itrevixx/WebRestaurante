import { useEffect, useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css";
import CalendarComp from "../../components/CalendarComp/CalendarComp";
import { isToday, isAfter, addMinutes, set } from "date-fns";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/Popup";

const Reserves = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [adultsCounter, setAdultsCounter] = useState(0);
  const [kidsCounter, setKidsCounter] = useState(0);
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
      if (isToday(date)) {
        const validTimes = times.filter((time) => {
          const [hour, minute] = time.split(":").map(Number);
          const selectedDateTime = set(date, { hours: hour, minutes: minute });
          return isAfter(selectedDateTime, addMinutes(now, 30));
        });
        setFilteredTimes(validTimes);
      } else {
        setFilteredTimes(times);
      }
    };
    filterTimes();
  }, [date]);
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

    // Validación de campo requerido
    if (phoneField.validity.valueMissing) {
      phoneField.setCustomValidity("Es necesario introducir un teléfono");
    }
    // Validación de campo requerido y formato de teléfono
    phoneField.setCustomValidity(
      phoneRegex.test(phoneField.value)
        ? "" // Número válido, sin mensaje de error
        : "Introduce un teléfono válido de 9 dígitos"
    );
  };

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

  // const validateDate = (e) => {
  //   const dateField = e.target;
  //   if (!dateField.value) {
  //     dateField.setCustomValidity("La fecha es obligatoria.");
  //     console.log("La fecha es obligatoria.");
  //   } else {
  //     dateField.setCustomValidity(""); // Resetea el mensaje de error
  //   }
  // };

  // const validateHour = (e) => {
  //   const hourField = e.target;
  //   if (!hourField.value) {
  //     hourField.setCustomValidity("La hora es obligatoria.");
  //     console.log("La hora es obligatoria.");
  //   } else {
  //     hourField.setCustomValidity(""); // Resetea el mensaje de error
  //   }
  // };

  // const validatePerson = () => {
  //   if (adultsCounter === 0 && kidsCounter === 0) {
  //     adultField.setCustomValidity("Por favor, selecciona al menos un adulto o un niño.");
  //     console.log("Por favor, selecciona al menos un adulto o un niño.");

  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)
    // Crear cliente
    const createdClient = await createClient({
      name: name,
      phone: phone,
      email: email,
    });

    const clientId = createdClient.data.id;

    try {
      // Crear reserva
      await createReserve({
        reservationDate: date,
        reservationTime: time,
        adults: adultsCounter,
        children: kidsCounter,
        user: { id: clientId },
      });

      // Limpiar formulario
      setName("");
      setPhone("");
      setDate(new Date());
      setTime("");
      setEmail("");
      setAdultsCounter(0);
      setKidsCounter(0);

      // Mostrar mensaje de éxito
      setPopupMessage("Reserva realizada con éxito.");
      setPopupType("success");
      setShowPopup(true);
    } catch (error) {
      // Manejar errores de red o al hacer la reserva
      setPopupMessage(error.message.includes("Network Error") ? "Hubo un error de red. Intenta nuevamente." : "Hubo un error al hacer la reserva. Intenta nuevamente.");
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
          <button type="button" onClick={() => setAdultsCounter(Math.max(0, adultsCounter - 1))}>-</button>
          <input
            type="number"
            className="adults"
            value={adultsCounter}
            onChange={(e) => setAdultsCounter(Number(e.target.value))}
          />
          <button type="button" onClick={() => setAdultsCounter(adultsCounter + 1)}>+</button>
        </div>

        <h3>Niños</h3>
        <div className="counter-group">
          <button type="button" onClick={() => setKidsCounter(Math.max(0, kidsCounter - 1))}>-</button>
          <input
            type="number"
            className="kids"
            value={kidsCounter}
            onChange={(e) => setKidsCounter(Number(e.target.value))}
          />
          <button type="button" onClick={() => setKidsCounter(kidsCounter + 1)}>+</button>
        </div>

        <input
          type="text"
          name="name"
          id="name"
          className="input-field"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)} // Actualiza el estado con el valor del input
          onInput={(e) => e.target.setCustomValidity("")} // Limpia el mensaje de error cuando el usuario empieza a escribir
          onInvalid={(e) => e.target.setCustomValidity("El nombre es obligatorio")} // Muestra un mensaje si el campo está vacío
          required
        />

        <input
          type="tel"
          name="phone"
          id="phone"
          className="input-field"
          placeholder="Teléfono"
          maxLength={9}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onInput={validatePhone} 
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInput={validateEmail} 
          required
        />
        <CalendarComp date={date} setDate={setDate} />
        <select
          className="select-field"
          value={time}
          id="day"
          onChange={(e) => setTime(e.target.value)}
          // onInput={validateDate}
        >
          <option value="">Selecciona una hora</option>
          {filteredTimes.map((availableTime) => (
            <option key={availableTime} value={availableTime}  id="time" >
              {availableTime}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="reserve-button"
          disabled={!time || !date || !(adultsCounter > 0 || kidsCounter > 0)} // Deshabilitar botón si no hay datos válidos
        >
          Reservar
        </button>
      </form>

      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)} // Cerrar popup
        />
      )}
    </div>
  );
};

export default Reserves;
