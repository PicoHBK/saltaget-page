import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Verificar si estamos en la ruta principal
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex mx-auto px-6 py-4 bg-blue-900">
      <div className="flex items-center justify-between w-full">
        <motion.div
          className="flex items-center space-x-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          onClick={() => navigate("/")} // Redirigir a la página principal
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            SaltaGet
          </span>
        </motion.div>

        {/* Mostrar elementos de navegación solo si NO estamos en la página de inicio */}
        {!isHomePage && (
          <div className="hidden md:flex space-x-8">
            <motion.button
              onClick={() => navigate('/chat')}
              className="text-gray-300 hover:text-cyan-400 transition-colors relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -2 }}
            >
              Chat IA
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;