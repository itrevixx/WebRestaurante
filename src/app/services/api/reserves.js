import instance from "./api";

export const createReserve = async (obj) =>
  await instance.post("/reservations/create", obj);

export const deleteReservation = async (id) =>
  await instance.delete(`/reservations/cancel/${id}`);
