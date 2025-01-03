import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteReservation } from "../../app/services/api/reserves";
import { Alert, AlertTitle } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./Cancelation.css";

const Cancelation = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      await deleteReservation(token);
      setLoading(false);
      setSuccess("Reserva cancelada con éxito.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(
        "No se ha podido cancelar la reserva. Verifica que estás cancelando la reserva con al menos 24 horas de antelación o inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="cancelation-container">
      {loading && (
        <div className="loader-overlay">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      <div style={{ height: "75px" }}>
        {success && (
          <Alert severity="success" onClose={() => setSuccess(null)}>
            <AlertTitle>Éxito</AlertTitle>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </div>
      <h2>¿Seguro que quieres cancelar la reserva?</h2>
      <button onClick={handleCancel}>Cancelar Reserva</button>
    </div>
  );
};

export default Cancelation;
