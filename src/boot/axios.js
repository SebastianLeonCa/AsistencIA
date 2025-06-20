import { boot } from "quasar/wrappers";
import axios from "axios";

const baseUrl = " http://localhost:5298";
//const baseUrl = "https://410a-38-25-122-10.ngrok-free.app";

const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

// Manejar los request y ponerle la autorización
apiClient.interceptors.request.use((config) => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const token = JSON.parse(userData).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Corrige la interpolación
    }
  }
  return config;
});

// Manejar los response y manejar errores como 401
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Se terminó el tiempo de sesión");
      console.error("El token ha expirado o no es válido.");
      localStorage.removeItem("userData");
      window.location.href = "";
    }
    return Promise.reject(error);
  }
);

const authClient = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = apiClient; // Usa 'apiClient' aquí
});

export { apiClient, authClient };
