import { create } from 'zustand';
import { login as loginService } from '../services/loginService';

const useLoginStore = create((set) => ({
  user: null,
  token: null,
  error: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await loginService(email, password);
      if (result.success) {
        set({
          user: result.user,
          token: result.token,
          isLoading: false,
        });
        if (typeof window !== 'undefined') {  // Verificar si estamos en el cliente
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
        }
        return result;
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {  // Verificar si estamos en el cliente
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    set({ user: null, token: null });
  },

  getUser: () => {
    if (typeof window !== 'undefined') {  // Verificar si estamos en el cliente
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  },

  getToken: () => {
    if (typeof window !== 'undefined') {  // Verificar si estamos en el cliente
      return localStorage.getItem('token');
    }
    return null;
  },

  isAuthenticated: () => {
    if (typeof window !== 'undefined') {  // Verificar si estamos en el cliente
      const token = localStorage.getItem('token');
      return token !== null;
    }
    return false;  // Si estamos en SSR, no está autenticado
  },
}));

export default useLoginStore;