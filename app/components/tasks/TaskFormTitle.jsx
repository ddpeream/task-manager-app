// src/components/TaskFormTitle.jsx
const TaskFormTitle = ({ isEditing }) => {
  return (
    <h2 className="font-bold text-2xl mb-6 text-gray-800">
      {isEditing ? 'Edit Task' : 'Add New Task'}
    </h2>
  );
};

export default TaskFormTitle;