// src/components/TaskList.jsx
const TaskList = ({ tasks, searchTerm, onEdit, onDelete }) => {
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {filteredTasks.length > 0 ? (
        <ul className="w-full max-w-2xl grid gap-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-lg text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500 truncate">{task.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${task.status === 'Completada' ? 'bg-green-100 text-green-600' : task.status === 'En progreso' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}
                >
                  {task.status}
                </span>
                <button
                  onClick={() => onEdit(task)}
                  className="text-yellow-500 hover:text-yellow-600 transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-1.5l-9 9m5 5H4v-5.036l9-9m4-2.036a2.5 2.5 0 113.536 3.536L9.293 17.293a1 1 0 00-.293.707V20h1.707a1 1 0 00.707-.293L19.232 8.232z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 hover:text-red-600 transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">No se encontraron tareas al filtrar por "{searchTerm}".</p>
      )}
    </>
  );
};

export default TaskList;