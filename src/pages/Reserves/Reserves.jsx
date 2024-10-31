import React, { useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css"; // Asegúrate de que la ruta sea correcta

const Reserves = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleClick = async () => {
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
        numPeople: person,
        user: { id: clientId },
      });

      setName("");
      setPhone("");
      setPerson("");
      setDate("");
      setTime("");
      setEmail("");

      alert("Reserva hecha!");
    } catch (error) {
      console.error("Error creating reservation:", error); // Muestra el error en la consola
      alert("La mesa ya tiene una reserva para el " + date);
    }
  };

  return (
    <div>
      <div className="reserve-container">
        <h2>Reserva una Mesa</h2>
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
        <select
          className="select-field"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
        >
          <option value="">Personas</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
        </select>
        <input
          type="date"
          className="input-field"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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
