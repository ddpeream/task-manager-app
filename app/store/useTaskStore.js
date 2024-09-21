import { create } from 'zustand';
import taskService from '../services/taskService';

const useTaskStore = create((set) => ({
  tasks: [],
  error: null,
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.fetchTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await taskService.addTask(task);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateTask: async (updatedTask) => {
    set({ isLoading: true, error: null });
    try {
      const task = await taskService.updateTask(updatedTask);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === updatedTask.id ? task : t)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteTask: async (taskId) => {
    set({ isLoading: true, error: null });
    try {
      await taskService.deleteTask(taskId);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useTaskStore;