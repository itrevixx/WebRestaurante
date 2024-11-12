import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComp.css";

const CalendarComp = ({ date, setDate }) => {
  const disableMondays = ({ date }) => date.getDay() === 1;

  return (
    <Calendar
      onChange={setDate}
      value={date}
      minDate={new Date()}
      minDetail="year"
      next2Label={null}
      prev2Label={null}
      tileDisabled={disableMondays}
      showNeighboringMonth={false}
    />
  );
};

export default CalendarComp;
