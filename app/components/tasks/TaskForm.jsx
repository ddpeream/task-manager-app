// src/components/TaskForm.jsx
import { useState, useEffect } from 'react';

const TaskForm = ({ isEditing, currentTask, onSubmit, onCancel }) => {
  const [task, setTask] = useState({ title: '', description: '', status: 'Pendiente' });

  useEffect(() => {
    if (isEditing && currentTask) {
      setTask(currentTask);
    }
  }, [isEditing, currentTask]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(task);
    setTask({ title: '', description: '', status: 'Pendiente' });
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 transition-transform transform scale-105">
        <h2 className="font-bold text-2xl mb-6 text-gray-800">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-bold text-gray-700 block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              required
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="font-bold text-gray-700 block mb-2">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleInputChange}
              required
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="font-bold text-gray-700 block mb-2">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleInputChange}
              required
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 text-black"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;