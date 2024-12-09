import { useEffect, useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css";
import CalendarComp from "../../components/CalendarComp";
import { isToday, isAfter, addMinutes, set, format } from "date-fns";
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

    if (!email.includes("@")) {
      alert("Introduce un email válido.");
      return;
    }

    try {
      const formattedDate = format(date, "dd-MM-yyyy");
      const createdClient = await createClient({
        name,
        phone,
        email,
      });

      const clientId = createdClient.data.id;

      await createReserve({
        reservationDate: formattedDate,
        reservationTime: time,
        adults: adultsCounter,
        children: kidsCounter,
        user: { id: clientId },
      });

      // Resetear formulario
      setName("");
      setPhone("");
      setEmail("");
      setDate(new Date());
      setTime("");
      setAdultsCounter(0);
      setKidsCounter(0);

      alert("¡Reserva realizada con éxito!");
      navigate("/");
    } catch (error) {
      console.error("Error al crear la reserva:", error.message);
      alert("Hubo un problema al realizar la reserva.");
    }
  };

  const incrementAdults = () => setAdultsCounter((prev) => prev + 1);
  const incrementKids = () => setKidsCounter((prev) => prev + 1);
  const decrementAdults = () =>
    setAdultsCounter((prev) => Math.max(0, prev - 1));
  const decrementKids = () => setKidsCounter((prev) => Math.max(0, prev - 1));

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
