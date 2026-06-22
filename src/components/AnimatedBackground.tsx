import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Fondo animado e interactivo con el scroll:
 * - blobs "aurora" con parallax (cada uno a distinta velocidad/dirección)
 * - ondas SVG fluidas que suben y se atenúan a medida que se baja
 * Va detrás del contenido (fixed, -z-10) y respeta prefers-reduced-motion
 * para las animaciones en bucle (ver index.css). El parallax depende del
 * scroll del propio usuario.
 */
export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();

  // Parallax de los blobs (distinta velocidad y sentido para dar profundidad)
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  // Ondas: suben y se atenúan con el scroll
  const wavesY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const wavesOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0.45]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-slate-950"
    >
      {/* Aurora blobs con parallax */}
      <motion.div style={{ y: blob1Y, scale: blobScale }} className="absolute inset-0">
        <div className="bg-blob bg-blob--1 bg-cyan-500/20 dark:bg-cyan-500/25" />
      </motion.div>
      <motion.div style={{ y: blob2Y, scale: blobScale }} className="absolute inset-0">
        <div className="bg-blob bg-blob--2 bg-blue-500/20 dark:bg-blue-600/25" />
      </motion.div>
      <motion.div style={{ y: blob3Y }} className="absolute inset-0">
        <div className="bg-blob bg-blob--3 bg-purple-500/15 dark:bg-purple-600/20" />
      </motion.div>

      {/* Ondas fluidas en la parte inferior */}
      <motion.svg
        style={{ y: wavesY, opacity: wavesOpacity }}
        className="absolute bottom-0 left-0 h-[45vh] min-h-[320px] w-full"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="sg-wave"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
          />
        </defs>
        <g>
          <use
            href="#sg-wave"
            x="48"
            y="0"
            className="fill-cyan-500/10 [animation:wave-flow_13s_linear_infinite] dark:fill-cyan-500/15"
          />
          <use
            href="#sg-wave"
            x="48"
            y="3"
            className="fill-blue-500/10 [animation:wave-flow_9s_linear_infinite] dark:fill-blue-600/15"
          />
          <use
            href="#sg-wave"
            x="48"
            y="5"
            className="fill-purple-500/5 [animation:wave-flow_17s_linear_infinite] dark:fill-purple-600/10"
          />
          <use
            href="#sg-wave"
            x="48"
            y="7"
            className="fill-cyan-400/10 [animation:wave-flow_21s_linear_infinite] dark:fill-cyan-400/10"
          />
        </g>
      </motion.svg>
    </div>
  );
}

export default AnimatedBackground;
