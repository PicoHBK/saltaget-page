function Header() {
  return (
    <div className="h-20 hidden w-full space-x-15 px-16 lg:flex">
      <div className="flex items-center gap-2">
        <div className="w-16 h-16 bg-white rounded-full"></div>
        <h2 className="text-white font-bold text-2xl">SaltaGet</h2>
      </div>
      <nav className="flex gap-6 items-center">
        <a href="#servicios" className="text-sky-50 font-bold text-xl">
          Servicios
        </a>
        <a href="#nosotros" className="text-sky-50 font-bold text-xl">
          Quienes Somos
        </a>
        <button className="text-sky-50 font-bold text-xl">Contactanos</button>
      </nav>
    </div>
  );
}

export default Header;
