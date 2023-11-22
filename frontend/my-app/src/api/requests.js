// requests.js
const BASE_URL = 'http://localhost:8090/api'; // Замените на URL вашего FastAPI-бэкенда

export const getRequests = async () => {
  const response = await fetch(`${BASE_URL}/requests`);
  const data = await response.json();
  return data;
};

export const getRequestById = async (id) => {
  const response = await fetch(`${BASE_URL}/requests/${id}`);
  const data = await response.json();
  return data;
};