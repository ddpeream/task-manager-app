// src/services/loginService.js
import axios from 'axios';

const API_URL = 'https://todo-backend-production-4086.up.railway.app/auth';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    console.log('status', response.status, response.status !== 201);
    // if (response.status !== 201) {
    //   throw new Error('Invalid credentials');
    // }

    const data = response.data;

    const user = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
    };
    const token = data.access_token;

    return { success: true, user, token };
  } catch (error) {
    return { success: false, error: error.response ? error.response.data.message : error.message };
  }
};

export { login };