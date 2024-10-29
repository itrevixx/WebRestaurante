import instance from "./api";

export const createReserve = async (obj) =>
  await instance.post("/reservations/create", obj);
