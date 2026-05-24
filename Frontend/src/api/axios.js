import axios from "axios";

const API = axios.create({
  baseURL: "https://brightfuture-backend.onrender.com/api",
});

export default API;