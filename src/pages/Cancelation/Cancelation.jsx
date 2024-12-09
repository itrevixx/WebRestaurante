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
      <h2>Cancelar Reserva</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. A aspernatur
        hic error fugiat sapiente accusantium, atque explicabo eius. Corrupti
        fugiat, voluptate in libero quaerat porro, sed repellat quos repellendus
        est voluptas, totam nobis dolores eveniet tempora eligendi illum? Soluta
        laudantium ex labore facere molestiae vero, debitis dolorum ipsa dolore
        blanditiis magni incidunt odit? Eligendi, illum laborum omnis odit
        voluptatem reiciendis quisquam, repellendus sit, nisi neque ex. Impedit
        corrupti nobis, reprehenderit consequuntur nesciunt, commodi consectetur
        tempore itaque quam beatae qui modi. Fugiat animi a hic nobis aliquam
        voluptatum vitae autem aliquid consequatur eius, omnis totam modi,
        distinctio ut sapiente saepe. Molestias cumque odit placeat! Odio
        nostrum sed at vel id placeat saepe, natus, animi error minima aliquam
        facere reiciendis ad quam laboriosam, voluptatibus voluptatem? Eius
        aliquid necessitatibus alias cum impedit nulla tempore quisquam, quae
        magnam quaerat atque. Nobis ducimus maiores officiis eum, repellendus
        blanditiis libero magnam, tenetur debitis nulla veritatis ratione quos.
        Impedit consectetur totam sed, delectus officia dicta quos aperiam,
        saepe cupiditate vero quidem repellat odio dolores tenetur pariatur a!
        Facere ad architecto doloremque temporibus tempore nemo quaerat
        suscipit. A assumenda totam facere officiis quis perferendis, dolorem
        provident exercitationem laudantium porro. Aliquam itaque non tempore.
        Assumenda voluptatem ad nisi repellendus.
      </p>
      <button onClick={handleCancel}>Cancelar Reserva</button>
    </div>
  );
};

export default Cancelation;
