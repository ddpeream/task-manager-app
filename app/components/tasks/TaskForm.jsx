// src/components/TaskForm.jsx
import { useState, useEffect } from 'react';
import TaskFormTitle from './TaskFormTitle';
import TaskFormInput from './TaskFormInput';
import TaskFormSelect from './TaskFormSelect';
import TaskFormButtons from './TaskFormButtons';
import Modal from '../common/Modal';

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
    <Modal isOpen={true} onClose={onCancel}>
      <TaskFormTitle isEditing={isEditing} />
      <form onSubmit={handleSubmit}>
        <TaskFormInput
          label="Title"
          name="title"
          value={task.title}
          onChange={handleInputChange}
        />
        <TaskFormInput
          label="Description"
          name="description"
          value={task.description}
          onChange={handleInputChange}
          type="textarea"
        />
        <TaskFormSelect
          label="Status"
          name="status"
          value={task.status}
          onChange={handleInputChange}
        />
        <TaskFormButtons onCancel={onCancel} isEditing={isEditing} />
      </form>
    </Modal>
  );
};

export default TaskForm;