import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { environment } from "./environment";


const confiAxios = axios.create({
    baseURL: environment.apiUrlLocal,
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