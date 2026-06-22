import { motion } from "framer-motion";
import {
  ChevronDown,
  Code2,
  Link2,
  Monitor,
  Network,
  Rocket,
  Search,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import logoSG from "../../assets/logo.png";
import Contacto from "./Contacto";
import Productos from "./Productos";
import ConfianEnNosotros from "./ConfianEnNosotros";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedBackground } from "@/components/AnimatedBackground";

/* ============================================================
 * Datos
 * ========================================================== */

const NAV_LINKS = [
  { label: "Productos", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];


const VALUES = [
  "Comunicación cercana y trato personalizado",
  "Soluciones a medida, adaptadas a cada necesidad",
  "Compromiso real con cada proyecto",
  "Acompañamiento y soporte post-entrega",
];

const SERVICES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Monitor,
    title: "Desarrollo Web",
    description:
      "Sitios y aplicaciones web a medida, optimizados para rendimiento y escalabilidad.",
  },
  {
    icon: Code2,
    title: "Software a Medida",
    description:
      "Soluciones personalizadas para mejorar los procesos y resultados de tu negocio.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Tiendas online con pasarelas de pago seguras, enfocadas en la conversión.",
  },
  {
    icon: Link2,
    title: "Integraciones API",
    description:
      "Conectamos tu plataforma con otros servicios y sistemas externos.",
  },
  {
    icon: Zap,
    title: "Automatización",
    description:
      "Optimizamos tareas repetitivas para mejorar la eficiencia operativa.",
  },
  {
    icon: Network,
    title: "Redes y Telecom.",
    description:
      "Diseño, instalación y mantenimiento de redes de datos y telecomunicaciones.",
  },
];

const PROCESS: { step: string; title: string; description: string; icon: LucideIcon }[] = [
  { step: "01", title: "Análisis", description: "Entendemos tus necesidades y objetivos.", icon: Search },
  { step: "02", title: "Diseño", description: "Creamos prototipos y arquitectura.", icon: Code2 },
  { step: "03", title: "Desarrollo", description: "Construimos tu solución con calidad.", icon: Zap },
  { step: "04", title: "Entrega", description: "Implementamos y brindamos soporte.", icon: Rocket },
];

const TESTIMONIALS = [
  {
    name: "Cecilia Roldán",
    company: "SIJAC Consultora Legal",
    testimonial:
      "Gracias al sistema de turnos y gestión que desarrollaron para nuestra consultora, ahora podemos organizarnos mejor y brindar una atención más ágil y eficiente.",
    avatar: "CR",
  },
  {
    name: "Georgina Lemos",
    company: "Fundación Convivir",
    testimonial:
      "El equipo entendió perfectamente la esencia de nuestra fundación. La nueva página nos permite llegar a más personas y mostrar de forma clara nuestra misión.",
    avatar: "GL",
  },
  {
    name: "Pablo Macedo",
    company: "Lubricar y Car premium",
    testimonial:
      "El sistema que nos desarrollaron simplificó por completo la gestión del taller y el lavadero. Ahora controlamos todo desde un solo lugar.",
    avatar: "PM",
  },
];

/* ============================================================
 * Helpers de animación
 * ========================================================== */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
    {children}
  </span>
);

/* ============================================================
 * Página
 * ========================================================== */

const Home = () => {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 selection:bg-cyan-500/20">
      <AnimatedBackground />

      {/* ---------- Navegación ---------- */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
        {/* Hairline gradiente */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        <nav className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a
            href="#inicio"
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 shadow-sm shadow-cyan-500/30 transition-transform group-hover:scale-105">
              <img
                src={logoSG}
                alt="SaltaGet"
                className="h-full w-full object-contain"
              />
            </span>
            Salta
            <span className="text-cyan-600 dark:text-cyan-400">Get</span>
          </a>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden items-center gap-7 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="mx-1 hidden h-5 w-px bg-slate-200 dark:bg-slate-800 md:block" />

            <a
              href="#contacto"
              className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 dark:bg-white dark:text-slate-900 dark:hover:bg-cyan-400 sm:inline-flex"
            >
              Contactanos
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section
        id="inicio"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          {/* Logo en badge de marca (visible en ambos temas) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto mb-7 w-fit"
          >
            <div className="absolute inset-0 -z-10 rounded-3xl bg-cyan-500/40 blur-2xl" />
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4 shadow-lg shadow-cyan-500/30 sm:h-28 sm:w-28">
              <img
                src={logoSG}
                alt="SaltaGet"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>

          {/* Marca principal */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl font-bold uppercase leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Salta
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">
              Get
            </span>
          </motion.h1>

          {/* Propuesta de valor */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto mt-5 max-w-2xl text-balance text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-200 sm:text-3xl"
          >
            Construimos el software que tu{" "}
            <span className="text-cyan-600 dark:text-cyan-400">
              empresa necesita
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl"
          >
            Transformamos ideas en soluciones digitales innovadoras.
            Desarrollamos software a medida con tecnología de vanguardia para
            impulsar el crecimiento de tu empresa.
          </motion.p>

        </div>

        <motion.a
          href="#productos"
          aria-label="Desplazarse hacia abajo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition-colors hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400"
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]">
            Descubrí más
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.a>
      </section>

      {/* ---------- Confían en nosotros ---------- */}
      <ConfianEnNosotros />

      {/* ---------- Nuestros Productos ---------- */}
      <Productos />

      {/* ---------- Nosotros ---------- */}
      <section
        id="nosotros"
        className="border-y border-slate-200/70 bg-slate-50/70 py-24 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/50 sm:py-32"
      >
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Eyebrow>Nosotros</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Innovación y experiencia
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Un equipo apasionado por la tecnología, comprometido con
              transformar ideas en soluciones digitales exitosas.
            </p>
          </motion.div>

          <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <h3 className="text-2xl font-semibold tracking-tight">
                Creciendo con cada proyecto
              </h3>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                Somos un equipo joven de desarrolladores y profesionales de
                tecnología con base en Salta, apasionados por crear soluciones
                digitales que marquen la diferencia. Apostamos al trabajo bien
                hecho, la mejora continua y la cercanía con cada cliente.
              </p>

              <ul className="mt-8 space-y-4">
                {VALUES.map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6.5l2.5 2.5 4.5-5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
              {[
                { number: "10+", label: "Proyectos" },
                { number: "100%", label: "Satisfacción cliente" },
                { number: "24/7", label: "Soporte técnico" },
                { number: "3+", label: "Años de experiencia" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                    {stat.number}
                  </div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Servicios ---------- */}
      <section id="servicios" className="py-24 sm:py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Eyebrow>Servicios</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Soluciones tecnológicas
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Un amplio rango de servicios para cubrir todas tus necesidades
              tecnológicas.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="group bg-white p-8 transition-colors hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 transition-colors group-hover:bg-cyan-600 group-hover:text-white dark:text-cyan-400 dark:group-hover:bg-cyan-400 dark:group-hover:text-slate-900">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Proceso ---------- */}
      <section
        id="proceso"
        className="border-y border-slate-200/70 bg-slate-50/70 py-24 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/50 sm:py-32"
      >
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Eyebrow>Proceso</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Cómo trabajamos
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Un proceso estructurado y transparente que garantiza resultados
              excepcionales.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((process, i) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                  {process.step}
                </span>
                <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                  <process.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{process.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Testimonios ---------- */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Eyebrow>Testimonios</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              La satisfacción de nuestros clientes es nuestra mayor recompensa.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex gap-0.5 text-cyan-500 dark:text-cyan-400">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-slate-700 dark:text-slate-300">
                  “{t.testimonial}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                    {t.avatar}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {t.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contacto ---------- */}
      <Contacto />

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
          <span>
            <span className="font-semibold text-slate-900 dark:text-white">
              SaltaGet
            </span>{" "}
            © {new Date().getFullYear()} — Todos los derechos reservados.
          </span>
          <span>Salta, Argentina</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
