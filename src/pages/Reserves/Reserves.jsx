import React, { useEffect, useState } from "react";
import { createClient } from "../../app/services/api/clients";
import { getTables } from "../../app/services/api/tables";
import { createReserve } from "../../app/services/api/reserves";
import "./Reserves.css"; // Asegúrate de que la ruta sea correcta

const Reserves = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [table, setTable] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const response = await getTables();
    setTables(response);
  };

  const handleClick = async () => {
    const createdClient = await createClient({
      name: name,
      phone: phone,
    });

    const clientId = createdClient.data.id;

    const selectedTable = tables.find((t) => t.numTable === parseInt(table));
    if (!selectedTable) {
      alert("Mesa no encontrada");
      return;
    }

    try {
      await createReserve({
        reservationDate: date,
        reservationTime: time,
        table: { id: selectedTable.id },
        user: { id: clientId },
      });

      setName("");
      setPhone("");
      setTable("");
      setDate("");
      setTime("");

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
        <select
          className="select-field"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        >
          <option value="">Selecciona una mesa</option>
          {tables.map((table) => (
            <option key={table.id} value={table.numTable}>
              Mesa: {table.numTable}
            </option>
          ))}
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
