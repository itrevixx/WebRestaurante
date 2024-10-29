import instance from "./api";

export const createClient = async (obj) => await instance.post("/users", obj);
