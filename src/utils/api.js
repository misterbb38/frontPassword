import axios from 'axios';

// Créer une instance d'axios avec la baseURL du serveur
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://serverpassword.onrender.com'
    //baseURL: 'http://localhost:5001'
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;