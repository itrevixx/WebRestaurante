import instance from "./api";

export const logout = async () => await instance.post("/logout");
