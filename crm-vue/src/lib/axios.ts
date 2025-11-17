import axios from 'axios';

/**
 * Instancia de Axios preconfigurada para la API
 * - baseURL: URL base de la API para evitar escribirla en cada llamada
 */
const api = axios.create({
    baseURL: 'http://localhost:4000/' // Dirección del servidor backend
})

export default api
