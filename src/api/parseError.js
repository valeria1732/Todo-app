export const parseError = (err) => {
  const data = err.response?.data;
  if (!data) return 'Error al conectar con el servidor';

  // NestJS ValidationPipe devuelve { message: string[] }
  if (Array.isArray(data.message)) {
    return data.message.join(' · ');
  }

  return data.message || data.error || 'Error inesperado';
};
