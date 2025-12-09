import axios from 'axios';
import keycloak from '../keycloak';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
    (config) => {
        if (keycloak.token) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expiré, essayer de rafraîchir
            try {
                await keycloak.updateToken(30);
                error.config.headers.Authorization = `Bearer ${keycloak.token}`;
                return api.request(error.config);
            } catch (refreshError) {
                keycloak.login();
            }
        }
        return Promise.reject(error);
    }
);

// Fonctions API
export const getCourses = () => api.get('/courses');
export const addCourse = (course) => api.post('/courses', course);
export const getUserInfo = () => api.get('/me');

export default api;