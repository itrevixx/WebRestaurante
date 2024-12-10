import React, { forwardRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComp.css";

const CalendarComp = forwardRef(({ date, setDate, required }, ref) => {
  const disableMondays = ({ date }) => date.getDay() === 1;

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    // Validación personalizada para el campo oculto
    const dateInput = document.getElementById("date-input");
    if (dateInput) {
      if (!selectedDate) {
        dateInput.setCustomValidity("Por favor, selecciona una fecha.");
      } else {
        dateInput.setCustomValidity("");
      }
    }
  };

  const handleInvalid = (e) => {
    e.preventDefault();
    const dateInput = document.getElementById("date-input");
    if (dateInput && !date) {
      dateInput.setCustomValidity("Por favor, selecciona una fecha.");
    }
  };

  return (
    <div>
      <Calendar
        ref={ref}
        onChange={handleDateChange}
        value={date}
        minDate={new Date()}
        minDetail="year"
        next2Label={null}
        prev2Label={null}
        tileDisabled={disableMondays}
        showNeighboringMonth={false}
      />
      <input
        type="text"
        id="date-input"
        value={date ? date.toISOString().split("T")[0] : ""}
        readOnly
        required={required}
        onInvalid={handleInvalid}
        style={{ display: "none" }} // Input oculto
      />
      {required && !date && (
        <span className="error">Por favor, selecciona una fecha.</span>
      )}
    </div>
  );
});

export default CalendarComp;
