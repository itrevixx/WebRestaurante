import { useEffect, useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css";
import CalendarComp from "../../components/CalendarComp";
import { isToday, isAfter, addMinutes, set } from "date-fns";

const Reserves = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [adultsCounter, setAdultsCounter] = useState(0);
  const [kidsCounter, setKidsCounter] = useState(0);
  const persons = kidsCounter + adultsCounter;
  const [filteredTimes, setFilteredTimes] = useState([]);

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
      //Si la fecha que se selecciona en el calendario es hoy, va a filtrar las horas que sean mayores a la hora actual + 30 minutos
      if (isToday(date)) {
        const validTimes = times.filter((time) => {
          //con split separamos las horas y los minutos del array de times y los transformamos a número de "13:30" a [13, 30].
          const [hour, minute] = time.split(":").map(Number);
          //seteamos la fecha usando la fecha seleccionada y la hora y minutos del array de time
          const selectedDateTime = set(date, { hours: hour, minutes: minute });
          //Si selectedDateTime es posterior a la hora actual mas 30 minutos, nos devuelve true y se almacena en el array de ValidTimes
          return isAfter(selectedDateTime, addMinutes(now, 30));
        });
        setFilteredTimes(validTimes);
        //Si la fecha es futura, va a mostrar todas las horas posibles de times
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
        numPeople: persons,
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
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const incrementAdults = () => setAdultsCounter((prev) => prev + 1);
  const decrementAdults = () =>
    setAdultsCounter((prev) => Math.max(0, prev - 1));
  const incrementKids = () => setKidsCounter((prev) => prev + 1);
  const decrementKids = () => setKidsCounter((prev) => Math.max(0, prev - 1));

  return (
    <div className="reserve-container">
      <div className="reserve-form">
        <h2>Reserva una Mesa</h2>
        <h2>Adultos</h2>
        <div className="counter-group">
          <button onClick={decrementAdults} disabled={adultsCounter === 0}>
            -
          </button>
          <input
            type="number"
            className="adults"
            value={adultsCounter}
            readOnly
          />
          <button onClick={incrementAdults}>+</button>
        </div>

        <h2>Niños</h2>
        <div className="counter-group">
          <button onClick={decrementKids} disabled={kidsCounter === 0}>
            -
          </button>
          <input type="number" className="kids" value={kidsCounter} readOnly />
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
