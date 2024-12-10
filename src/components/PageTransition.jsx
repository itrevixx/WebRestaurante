// src/components/PageTransition.jsx
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "../App.css"; // Estilos de las transiciones

const PageTransition = ({ children }) => {
  const location = useLocation(); // Obtiene la ubicación de la ruta actual

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key} // Cambia la clave cuando la ubicación cambie
        timeout={500} // Duración de la transición
        classNames="fade" // Las clases CSS para la animación
        unmountOnExit // Asegura que el componente se elimine del DOM cuando no está visible
      >
        {/* Asegúrate de envolver children en un único contenedor */}
        <div>{children}</div> 
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
