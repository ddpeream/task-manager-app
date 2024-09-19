import { FaHome, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    // Redirigir al usuario a la página de inicio de sesión o a otra página
    window.location.href = '/pages/login';
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <h1 className="text-3xl font-extrabold text-white tracking-wide">Task Manager</h1>

        {/* Navigation Links */}
        {/* <ul className="flex space-x-6">
          <li>
            <a href="#" className="flex items-center text-white hover:text-gray-300 transition duration-300">
              <FaHome className="mr-2" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-white hover:text-gray-300 transition duration-300">
              <FaInfoCircle className="mr-2" />
              <span>About</span>
            </a>
          </li>
        </ul> */}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 hover:text-blue-700 transition duration-300"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;