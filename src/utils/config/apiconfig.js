import axios from "axios";

export const localDB = axios.create({
  baseURL: "https://back-book-store.vercel.app/",
  responseType: "json",
  timeout: 3000,
});
