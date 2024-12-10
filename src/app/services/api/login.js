import instance from "./api";

export const login = async (obj) => await instance.post("/login", obj);
