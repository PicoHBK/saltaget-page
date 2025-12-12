import { ArrowRight, Zap, Sparkles, TrendingUp, DollarSign } from "lucide-react";

export default function NoaGestionHero() {
  return (
    <section className="bg-slate-950 py-8 sm:py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Card principal */}
        <div className="relative overflow-hidden bg-black rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-800">
          
          {/* Efectos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 -left-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-blue-600/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          </div>

          {/* Contenido */}
          <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
            
            {/* Badge superior */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900/80 border border-blue-500/50 backdrop-blur-sm shadow-xl shadow-blue-500/20">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-white">SaltaGet presenta</span>
              </div>
            </div>

            {/* Título */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-4 leading-tight text-center">
              NOA <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">GESTIÓN</span>
            </h1>

            <div className="h-1 sm:h-1.5 w-20 sm:w-28 md:w-32 mx-auto rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 mb-4 sm:mb-6 shadow-2xl shadow-blue-500/60" />

            {/* Descripción */}
           <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-bold text-center">
  El sistema ideal para tu kiosco, tienda o emprendimiento. 
  <span className="text-cyan-400"> Gestión completa en minutos, sin complicaciones.</span>
</p>


            {/* 3 Cards de beneficios */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10 max-w-4xl mx-auto">
              {[
                { 
                  icon: Zap, 
                  title: "Setup en 5 min", 
                  desc: "Empezá ahora mismo",
                  color: "from-yellow-500 to-orange-600", 
                  shadow: "shadow-yellow-500/50" 
                },
                { 
                  icon: TrendingUp, 
                  title: "Control total", 
                  desc: "Stock y ventas en vivo",
                  color: "from-blue-500 to-cyan-600", 
                  shadow: "shadow-blue-500/50" 
                },
                { 
                  icon: DollarSign, 
                  title: "Más ingresos", 
                  desc: "Reportes claros",
                  color: "from-green-500 to-emerald-600", 
                  shadow: "shadow-green-500/50" 
                },
              ].map((item, i) => (
                <div key={i} className="group bg-slate-900/60 backdrop-blur-sm hover:bg-slate-900/80 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-700 hover:border-blue-500 transition-all hover:scale-105 hover:shadow-2xl">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl ${item.shadow} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-white font-black text-base sm:text-lg mb-2 text-center">{item.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm text-center font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Principal */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <a 
                href="https://noagestion.com.ar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-full sm:w-auto"
              >
                <button className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-2xl shadow-blue-600/60 font-black transition-all hover:scale-105 hover:shadow-blue-500/80 flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto overflow-hidden border-2 border-blue-400/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">Conocer NOA Gestión</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-3 transition-transform relative z-10" />
                </button>
              </a>
            </div>

            {/* Badge de urgencia */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/60 backdrop-blur-sm shadow-lg shadow-orange-500/30">
                <span className="text-orange-300 font-bold text-xs sm:text-sm">🔥 Lanzamiento Enero 2026 • Acceso anticipado disponible</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}