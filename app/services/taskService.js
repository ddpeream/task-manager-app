import { create } from 'zustand';
import axios from 'axios';

const useTaskStore = create((set) => ({
  tasks: [],

  fetchTasks: async () => {
    try {
      const response = await axios.get('http://localhost:3000/task/all');
      console.log('Lista de tareas:', response.data);
      set({ tasks: response.data });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },

  addTask: async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/task/create', task);
      set((state) => ({
        tasks: [...state.tasks, response.data]
      }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },

  updateTask: async (updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:3000/task/${updatedTask.id}`, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? response.data : task
        ),
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/task/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },
}));

// Ejecutar fetchTasks y hacer console.log de las tareas
const { fetchTasks } = useTaskStore.getState();
fetchTasks();

export default useTaskStore;