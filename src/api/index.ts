import axios from "axios";

const api = axios.create({
   baseURL: "https://brestok-ocr-backend.hf.space",
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
});

export default api;
