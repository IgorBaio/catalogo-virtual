// services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://catalogo-virtual-server.onrender.com/api/', // coloca o endereço base da sua API
  timeout: 10000, // tempo limite de 10s (opcional)
  headers: {
    'Content-Type': 'application/json',
  },
});
