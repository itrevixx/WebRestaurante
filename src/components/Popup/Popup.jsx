import React from "react";
import "./Popup.css";

const Popup = ({ message, onClose, type, title }) => {
  return (
    <div className="popup-overlay">
      <div className={`popup-container ${type}`}>
        <div className="popup-header">
          {/* Si no se pasa un título personalizado, se usará el predeterminado según el tipo */}
          <h2>{title || (type === "success" ? "¡Éxito!" : "Error")}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="popup-content">
          <p>{message}</p>
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
