// Elimina caracteres peligrosos según el tipo de campo
export const sanitizeText = (value) =>
  value.replace(/[<>"'`=;{}()\[\]\\\/]/g, '');

export const sanitizeUsername = (value) =>
  value.replace(/[^a-zA-Z0-9_.-]/g, ''); // solo letras, números, guion, punto

export const sanitizeDescription = (value) =>
  value.replace(/[<>"'`=;{}()\[\]\\]/g, '');