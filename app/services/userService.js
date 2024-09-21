import axios from 'axios';
import { getToken } from '../store/useAuthStore'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

const API_URL = 'https://todo-backend-production-4086.up.railway.app/user';

const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/create`, user);
    console.log('El usuario ya creado', response);

    if (response.status !== 201) {
      throw new Error('Failed to create user');
    }

    const data = response.data;

    const createdUser = {
      id: data.id,
      name: data.name,
      email: data.email,
    };

    return { success: true, user: createdUser };
  } catch (error) {
    return { success: false, error: error.response ? error.response.data.message : error.message };
  }
};

export { createUser };