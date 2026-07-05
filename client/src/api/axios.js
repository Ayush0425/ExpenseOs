
import axios from "axios";

const api = axios.create({
  baseURL: "https://expenseos-api.onrender.com/api",
});

export default api;