// src/pages/task/index.jsx
import ProtectedRoute from '../../routes/ProtectedRoute';  // Protege la ruta
import Tasks from '../../pages/task';  // Importa el componente de tareas

const TaskPageWrapper = () => {
    return (
        <ProtectedRoute>
          <Tasks />  {/* Renderiza la lista de tareas solo si el usuario está autenticado */}
        </ProtectedRoute>
    );
};

export default TaskPageWrapper;
