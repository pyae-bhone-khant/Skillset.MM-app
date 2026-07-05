// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
    : "http://localhost:6000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// for locel
// const api = axios.create({
//   baseURL:
//     process.env.NEXT_PUBLIC_API_URL ?
//       `${process.env.NEXT_PUBLIC_API_URL}`
//     : "http://localhost:8000/api/v1",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
