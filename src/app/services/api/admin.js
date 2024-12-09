import instance from "./api";

export const getAdmin = async () => await instance.get("/admin");
