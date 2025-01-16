import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import CalendarComp from "./CalendarComp/CalendarComp";
import { useState, useEffect } from "react";
import { isToday, isAfter, addMinutes, set, format } from "date-fns";
import { createClient } from "../app/services/api/clients";
import { createReserveManual } from "../app/services/api/reserves";

const AddReserve = ({ open, setOpen, fetchReserves }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    adultsCounter: 0,
    kidsCounter: 0,
  });
  const [filteredTimes, setFilteredTimes] = useState([]);

  const times = [
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  useEffect(() => {
    const filterTimes = () => {
      const now = new Date();
      const selectedDate = formData.date;
      if (isToday(selectedDate)) {
        const validTimes = times.filter((time) => {
          const [hour, minute] = time.split(":").map(Number);
          const selectedDateTime = set(selectedDate, {
            hours: hour,
            minutes: minute,
          });
          return isAfter(selectedDateTime, addMinutes(now, 30));
        });
        setFilteredTimes(validTimes);
      } else {
        setFilteredTimes(times);
      }
    };
    filterTimes();
  }, [formData.date]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const formattedDate = format(formData.date, "dd-MM-yyyy");

    const createdClient = await createClient({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    });

    const clientId = createdClient.data?.id;

    const reserveData = {
      reservationDate: formattedDate,
      reservationTime: formData.time,
      adults: formData.adultsCounter,
      children: formData.kidsCounter,
      user: { id: clientId },
    };

    await createReserveManual(reserveData);
    fetchReserves();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ marginBottom: "20px" }}>Añadir reservas</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          value={formData.name}
          label="Nombre"
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          value={formData.phone}
          label="Teléfono"
          type="text"
          inputProps={{ maxLength: 9 }}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <TextField
          value={formData.email}
          label="Email"
          type="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          value={formData.adultsCounter}
          label="Adultos"
          type="number"
          onChange={(e) =>
            setFormData({ ...formData, adultsCounter: e.target.value })
          }
        />
        <TextField
          value={formData.kidsCounter}
          label="Niños"
          type="number"
          onChange={(e) =>
            setFormData({ ...formData, kidsCounter: e.target.value })
          }
        />
        <CalendarComp
          date={formData.date}
          setDate={(date) => setFormData((prev) => ({ ...prev, date }))}
          onChange={(e) => setFormData({ ...formData, date: e })}
          sx={{ height: "100px" }}
        />
        <select
          className="select-field"
          value={formData.time}
          name="time"
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          onInput={(e) => e.target.setCustomValidity("")}
          onInvalid={(e) =>
            e.target.setCustomValidity("Selecciona la hora de la reserva")
          }
        >
          <option value="">Selecciona una hora</option>
          {filteredTimes.map((time, index) => (
            <option key={index} value={time} id="time">
              {time}
            </option>
          ))}
        </select>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "fit-content", margin: "0 auto" }}
        >
          Crear Reserva
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReserve;
