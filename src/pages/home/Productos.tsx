import { motion } from "framer-motion";
import { ArrowRight, Bot, Check, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Product = {
  icon: LucideIcon;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  external: boolean;
};

const PRODUCTS: Product[] = [
  {
    icon: Store,
    badge: "Lanzamiento Enero 2026",
    title: "NOA",
    highlight: "Gestión",
    description:
      "El sistema ideal para tu kiosco, tienda o emprendimiento. Gestión completa en minutos, sin complicaciones.",
    features: [
      "Setup en 5 minutos",
      "Control total de stock y ventas en vivo",
      "Reportes claros para más ingresos",
    ],
    cta: "Conocer NOA Gestión",
    href: "https://noagestion.com.ar",
    external: true,
  },
  {
    icon: Bot,
    badge: "Demo en vivo",
    title: "Asistente",
    highlight: "IA",
    description:
      "Un asistente inteligente entrenado con el catálogo de tu negocio: responde consultas y recomienda productos las 24 horas.",
    features: [
      "Respuestas instantáneas y precisas",
      "Recomendaciones personalizadas",
      "Disponible 24/7, sin descanso",
    ],
    cta: "Probar el chat",
    href: "/chat",
    external: false,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const ctaClass =
    "group/cta mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 dark:bg-white dark:text-slate-900 dark:hover:bg-cyan-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 backdrop-blur-sm transition-colors hover:border-cyan-500/50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-400/50 sm:p-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition-opacity group-hover:opacity-100 dark:bg-cyan-500/20" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <product.icon className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {product.badge}
        </span>
      </div>

      <h3 className="relative z-10 mt-6 text-3xl font-bold tracking-tight">
        {product.title}{" "}
        <span className="text-cyan-600 dark:text-cyan-400">
          {product.highlight}
        </span>
      </h3>

      <p className="relative z-10 mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
        {product.description}
      </p>

      <ul className="relative z-10 mt-6 space-y-3">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto">
        {product.external ? (
          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            {product.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </a>
        ) : (
          <Link to={product.href} className={ctaClass}>
            {product.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

const Productos = () => {
  return (
    <section id="productos" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Nuestros productos
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Soluciones listas para usar
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Además de los desarrollos a medida, creamos nuestros propios
            productos para potenciar tu negocio.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.title} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Productos;
