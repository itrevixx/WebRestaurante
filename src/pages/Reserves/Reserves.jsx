import { useEffect, useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css";
import CalendarComp from "../../components/CalendarComp";
import { isToday, isAfter, addMinutes, set } from "date-fns";
import { useNavigate } from "react-router-dom";

const Reserves = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [adultsCounter, setAdultsCounter] = useState(0);
  const [kidsCounter, setKidsCounter] = useState(0);
  const [filteredTimes, setFilteredTimes] = useState([]);
  const navigate = useNavigate();

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
      const now = new Date(); // Obtenemos la fecha y hora actual
      // Si la fecha seleccionada en el calendario es el día de hoy:
      if (isToday(date)) {
        // Filtramos las horas disponibles para mostrar solo las que sean mayores a la hora actual + 30 minutos
        const validTimes = times.filter((time) => {
          // Usamos el método split para separar la hora y los minutos de cada elemento en el array 'times' (ejemplo: "13:30" se convierte en [13, 30])
          const [hour, minute] = time.split(":").map(Number);
          // Usamos 'set' para crear una nueva fecha con la hora y minutos seleccionados, pero manteniendo la misma fecha que se eligió en el calendario
          const selectedDateTime = set(date, { hours: hour, minutes: minute });
          // Comprobamos si la fecha y hora seleccionada es después de la hora actual + 30 minutos
          // Si es así, agregamos esa hora a la lista de horas válidas
          return isAfter(selectedDateTime, addMinutes(now, 30));
        });
        // Guardamos en el estado las horas que cumplen con el filtro
        setFilteredTimes(validTimes);
        // Si la fecha seleccionada es un día futuro (no hoy), mostramos todas las horas disponibles
      } else {
        setFilteredTimes(times);
      }
    };
    filterTimes();
  }, [date]);

  const handleClick = async () => {
    if (
      !name ||
      !phone ||
      !email ||
      (!kidsCounter && !adultsCounter) ||
      !time ||
      !date
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Verificar si el email contiene '@'
    if (!email.includes("@")) {
      alert("Introduce un email válido.");
      return;
    }

    const createdClient = await createClient({
      name: name,
      phone: phone,
      email: email,
    });

    const clientId = createdClient.data.id;

    try {
      await createReserve({
        reservationDate: date,
        reservationTime: time,
        adults: adultsCounter,
        children: kidsCounter,
        user: { id: clientId },
      });

      setName("");
      setPhone("");
      setDate(new Date());
      setTime("");
      setEmail("");
      setAdultsCounter(0);
      setKidsCounter(0);

      alert("Reserva hecha!");
      navigate("/");
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  // Incrementa el contador de adultos en 1
  const incrementAdults = () => {
    setAdultsCounter((previousValue) => {
      return previousValue + 1;
    });
  };

  // Incrementa el contador de niños en 1.
  const incrementKids = () => {
    setKidsCounter((previousValue) => {
      return previousValue + 1;
    });
  };

  // Disminuye el contador de adultos en 1, pero no baja de 0.
  const decrementAdults = () => {
    setAdultsCounter((previousValue) => {
      return Math.max(0, previousValue - 1);
    });
  };

  // Disminuye el contador de niños en 1, pero no baja de 0.
  const decrementKids = () => {
    setKidsCounter((previousValue) => {
      return Math.max(0, previousValue - 1);
    });
  };

  return (
    <div className="reserve-container">
      <div className="reserve-form">
        <h2>Reserva una Mesa</h2>
        <h3>Adultos</h3>
        <div className="counter-group">
          <button onClick={decrementAdults} disabled={adultsCounter === 0}>
            -
          </button>
          <input
            type="number"
            className="adults"
            value={adultsCounter}
            onChange={(e) => setAdultsCounter(Number(e.target.value))}
          />
          <button onClick={incrementAdults}>+</button>
        </div>

        <h3>Niños</h3>
        <div className="counter-group">
          <button onClick={decrementKids} disabled={kidsCounter === 0}>
            -
          </button>
          <input
            type="number"
            className="kids"
            value={kidsCounter}
            onChange={(e) => setKidsCounter(Number(e.target.value))}
          />
          <button onClick={incrementKids}>+</button>
        </div>
        <input
          type="text"
          className="input-field"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CalendarComp date={date} setDate={setDate} />
        <select
          className="select-field"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Selecciona una hora</option>
          {filteredTimes.map((availableTime) => (
            <option key={availableTime} value={availableTime}>
              {availableTime}
            </option>
          ))}
        </select>
        <button className="reserve-button" onClick={handleClick}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default Reserves;
