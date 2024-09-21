// src/components/TaskFormSelect.jsx
const TaskFormSelect = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="font-bold text-gray-700 block mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 text-black"
      >
        <option value="Pendiente">Pendiente</option>
        <option value="En progreso">En progreso</option>
        <option value="Completada">Completada</option>
      </select>
    </div>
  );
};

export default TaskFormSelect;