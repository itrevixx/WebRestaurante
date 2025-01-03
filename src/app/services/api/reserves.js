import instance from "./api";

export const createReserve = async (obj) =>
  await instance.post("/reservations/create", obj);

export const deleteReservation = async (token) =>
  await instance.delete(`/reservations/cancel/${token}`);

export const deleteManualReserve = async (token) => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  return await instance.delete(`/reservations/manualCancel/${token}`, {
    auth: {
      username: username,
      password: password,
    },
  });
};
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
