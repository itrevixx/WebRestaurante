import { useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css"; // Asegúrate de que la ruta sea correcta
import CalendarComp from "../../components/CalendarComp";

const Reserves = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [adultsCounter, setAdultsCounter] = useState(0);
  const [kidsCounter, setKidsCounter] = useState(0);
  const persons = kidsCounter + adultsCounter;

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
          <option value="13:00">13:00</option>
          <option value="13:15">13:15</option>
          <option value="13:30">13:30</option>
          <option value="13:45">13:45</option>
          <option value="14:00">14:00</option>
          <option value="14:15">14:15</option>
          <option value="14:30">14:30</option>
          <option value="14:45">14:45</option>
          <option value="15:00">15:00</option>
        </select>
        <button className="reserve-button" onClick={handleClick}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default Reserves;
