import { useEffect, useState } from "react";
import "./PanelControl.css";
import {
  getReserves,
  deleteManualReserve,
} from "../../app/services/api/reserves"; // Asegúrate de tener deleteReserve en tus servicios API
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const PanelControl = () => {
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reservesPerPage = 8;

  // Estados para el diálogo
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReserve, setSelectedReserve] = useState(null);

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

  const filteredReserves = reserves.filter((reserve) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reserve.contactName.toLowerCase().includes(searchLower) ||
      reserve.contactPhone.includes(searchTerm) ||
      reserve.reservationDate.includes(searchTerm) ||
      reserve.reservationTime.includes(searchTerm) ||
      reserve.numPeople.toString().includes(searchTerm) ||
      reserve.adults.toString().includes(searchTerm) ||
      reserve.children.toString().includes(searchTerm)
    );
  });

  const indexOfLastReserve = currentPage * reservesPerPage;
  const indexOfFirstReserve = indexOfLastReserve - reservesPerPage;
  const currentReserves = filteredReserves.slice(
    indexOfFirstReserve,
    indexOfLastReserve
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDeleteReserve = async () => {
    if (selectedReserve) {
      await deleteManualReserve(selectedReserve.token);
      fetchReserves();
      setOpenDialog(false);
    }
  };

  const openConfirmDialog = (reserve) => {
    setSelectedReserve(reserve);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedReserve(null);
  };

  return (
    <div className="panel-container">
      <h1>Lista de reservas</h1>
      <TextField
        label="Buscar reserva"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: "20px", width: "30%", margin: "auto" }}
      />

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
            <Button
              color="error"
              variant="contained"
              onClick={() => openConfirmDialog(reserve)}
            >
              Eliminar Reserva
            </Button>
          </li>
        ))}
      </ul>
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent sx={{ fontFamily: "Arial" }}>
          <p>
            ¿Estás seguro de que quieres eliminar la reserva a nombre de{" "}
            {selectedReserve?.contactName}?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" variant="contained">
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteReserve}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Pagination
        count={Math.ceil(filteredReserves.length / reservesPerPage)}
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
