import { useEffect, useState } from "react";
import "./PanelControl.css";
import { getReserves } from "../../app/services/api/reserves";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const PanelControl = () => {
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const reservesPerPage = 8; // Número de reservas por página

  const fetchReserves = async () => {
    setLoading(true);
    const response = await getReserves();
    setReserves(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReserves();
    const intervalId = setInterval(() => {
      fetchReserves();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Calcular las reservas visibles para la página actual
  const indexOfLastReserve = currentPage * reservesPerPage;
  const indexOfFirstReserve = indexOfLastReserve - reservesPerPage;
  const currentReserves = reserves.slice(
    indexOfFirstReserve,
    indexOfLastReserve
  );

  // Cambiar de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="panel-container">
      <h1>Lista de reservas</h1>
      {loading && (
        <div className="loader-overlay">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      <ul className="reserves-list">
        {currentReserves.map((reserve) => (
          <li className="reserve-item" key={reserve.id}>
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
      <Pagination
        count={Math.ceil(reserves.length / reservesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          margin: "auto",
          padding: "50px",
        }}
      />
    </div>
  );
};

export default PanelControl;
