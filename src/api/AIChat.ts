import axios from 'axios';

// Usar la variable de entorno definida
const AIChatApi = axios.create({
    baseURL: import.meta.env.VITE_API_CHAT_URL
});

export default AIChatApi;
