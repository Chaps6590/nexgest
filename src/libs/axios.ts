import { useAuthStore } from "@/store/auth";
import axios from "axios";


const confiAxios = axios.create({
    baseURL: import.meta.env.API_URL_RENDER,
    withCredentials: true,    
})

confiAxios.interceptors.request.use((config) => {    
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default confiAxios;