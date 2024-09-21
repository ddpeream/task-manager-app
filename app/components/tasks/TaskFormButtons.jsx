// src/components/TaskFormButtons.jsx
const TaskFormButtons = ({ onCancel, isEditing }) => {
  return (
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
  );
};

export default TaskFormButtons;