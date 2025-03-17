import axios from "axios";

// Crear una instancia de Axios
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // URL base del backend
    headers: {
        "Content-Type": "application/json",
    },
});

// Agregar un interceptor para incluir el token automáticamente
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token"); // Buscar el token en localStorage
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
