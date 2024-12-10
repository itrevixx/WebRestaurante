import instance from "./api";

export const createReserve = async (obj) =>
  await instance.post("/reservations/create", obj);

export const deleteReservation = async (id) =>
  await instance.delete(`/reservations/cancel/${id}`);

export const getReserves = async () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  return await instance.get("/reservations/reservesList", {
    auth: {
      username: username,
      password: password,
    },
  });
};
