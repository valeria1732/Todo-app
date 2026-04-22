import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de Salida: Pone el Access Token en todas las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de Entrada: Maneja el error 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // 1. Sacamos el REFRESH TOKEN (el que empieza con eyJ... y no ha caducado)
        const rt = localStorage.getItem('token');

        // 2. Usamos nuestra instancia 'api' para el POST
        // SOBREESCRIBIMOS el header Authorization solo para esta llamada
        const res = await api.post('/auth/refresh', {}, {
          headers: {
            Authorization: `Bearer ${rt}` 
          }
        });

        if (res.status === 200) {
          const { access_token, refresh_token } = res.data;

          // 3. Guardamos los nuevos tokens
          localStorage.setItem('token', access_token);
          localStorage.setItem('refreshToken', refresh_token);

          // 4. Reintentamos la petición original con el nuevo Access Token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;