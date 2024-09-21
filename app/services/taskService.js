import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const BASE_URL = 'https://todo-backend-production-4086.up.railway.app/task';

const taskService = {
  tasks: [],

  fetchTasks: async () => {
    try {
      const { getUser } = useAuthStore.getState();
      const user = await getUser();
      const userId = user.id; // Obtener el ID del usuario
      const response = await axios.get(`${BASE_URL}/all/${userId}`);
      console.log('Lista de tareas:', response.data);
      taskService.tasks = response.data;
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  addTask: async (task) => {
    try {
      console.log('tarea a enviar', task);
      const response = await axios.post(`${BASE_URL}/create`, task);
      taskService.tasks.push(response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  updateTask: async (updatedTask) => {
    try {
      const response = await axios.put(`${BASE_URL}/${updatedTask.id}`, updatedTask);
      taskService.tasks = taskService.tasks.map((task) =>
        task.id === updatedTask.id ? response.data : task
      );
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/${taskId}`);
      taskService.tasks = taskService.tasks.filter((task) => task.id !== taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
};

// Ejecutar fetchTasks y hacer console.log de las tareas
taskService.fetchTasks().then(tasks => console.log(tasks));

export default taskService;