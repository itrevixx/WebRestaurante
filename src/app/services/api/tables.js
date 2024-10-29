import instance from "./api";

export const createTable = async (obj) => await instance.post("/tables", obj);

export const getTables = async () => {
  const response = await instance.get("/tables/allTables");
  return response.data;
};
