import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoSG from "@/assets/logo.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // La home tiene su propia barra de navegación, evitamos el header duplicado
  if (location.pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 shadow-sm shadow-cyan-500/30">
            <img src={logoSG} alt="SaltaGet" className="h-full w-full object-contain" />
          </span>
          Salta<span className="text-cyan-600 dark:text-cyan-400">Get</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 sm:inline-flex"
          >
            Volver al inicio
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
