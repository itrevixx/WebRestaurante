import axios from "axios";

export const instance = axios.create({
  baseURL: "https://backrestaurante.onrender.com/",
});

export default instance;
