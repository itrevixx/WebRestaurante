import { useNavigate, useParams } from "react-router-dom";
import { deleteReservation } from "../../app/services/api/reserves";
import "./Cancelation.css";

const Cancelation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancel = async () => {
    try {
      await deleteReservation(id);
      alert("Reserva cancelada.");
      navigate("/");
    } catch (error) {
      alert("No se ha podido cancelar la reserva:", error);
    }
  };

  return (
    <div className="cancelation-container">
      <h2>Seguro que quieres cancelar la reserva?</h2>
      <button onClick={handleCancel}>Cancelar Reserva</button>
    </div>
  );
};

export default Cancelation;
