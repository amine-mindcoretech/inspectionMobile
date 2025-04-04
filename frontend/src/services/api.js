import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/TachesInspection`);
    return response.data.response.data; // Retourne uniquement les données des tâches
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    throw error;
  }
};