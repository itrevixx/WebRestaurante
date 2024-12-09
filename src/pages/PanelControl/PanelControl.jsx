import { useEffect, useState } from "react";
import "./PanelControl.css";
import { getReserves } from "../../app/services/api/reserves";
const PanelControl = () => {
  const [reserves, setReserves] = useState([]);

  const fetchReserves = async () => {
    const response = await getReserves();
    setReserves(response.data);
  };

  useEffect(() => {
    fetchReserves();
    const intervalId = setInterval(() => {
      fetchReserves();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="panel-container">
      <ul>
        {reserves.map((reserve) => (
          <li key={reserve.id}>
            <div>
              <p>Nombre: {reserve.contactName}</p>
              <p>Número de telefono: {reserve.contactPhone}</p>
              <p>Fecha: {reserve.reservationDate}</p>
              <p>Hora: {reserve.reservationTime}</p>
              <p>Número de personas: {reserve.numPeople}</p>
              <p>Número de adultos: {reserve.adults}</p>
              <p>Número de niños: {reserve.children}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelControl;
