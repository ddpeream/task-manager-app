// src/components/TaskFormInput.jsx
const TaskFormInput = ({ label, name, value, onChange, type = 'text' }) => {
  return (
    <div className="mb-4">
      <label className="font-bold text-gray-700 block mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 text-black"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 text-black"
        />
      )}
    </div>
  );
};

export default TaskFormInput;