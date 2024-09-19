// src/pages/tasks.jsx
"use client";

import { useState } from 'react';
import useTaskStore from '../services/taskService';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, fetchTasks } = useTaskStore();
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pendiente' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (tasks.length === 0) {
    fetchTasks();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  const handleFormSubmit = (task) => {
    if (isEditing) {
      updateTask({ ...task, id: currentTask.id });
    } else {
      addTask(task);
    }
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleFormCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 mt-16">
        <h1 className="font-extrabold text-5xl mb-12 text-gray-900 tracking-tight shadow-sm">Task Manager</h1>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-8 w-full max-w-xl p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 transition duration-300 text-black"
        />

        <TaskList tasks={tasks} searchTerm={searchTerm} onEdit={handleEdit} onDelete={handleDelete} />

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-10 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        {isModalOpen && (
          <TaskForm
            isEditing={isEditing}
            currentTask={currentTask}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Tasks;