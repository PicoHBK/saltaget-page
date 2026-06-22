import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { FormContacto } from "./forms/FormContacto";

const CONTACT_INFO = [
  { icon: Mail, title: "Email", info: "saltaget@gmail.com" },
  { icon: Phone, title: "Teléfono", info: "+54 387 6050-942" },
  { icon: MapPin, title: "Ubicación", info: "Salta, Argentina" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const Contacto = () => {
  return (
    <section
      id="contacto"
      className="border-y border-slate-200/70 bg-slate-50/70 py-24 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/50 sm:py-32"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Contacto
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            ¿Listo para innovar?
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Contáctanos y descubre cómo podemos transformar tu visión en una
            realidad digital exitosa.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {CONTACT_INFO.map((contact) => (
            <div
              key={contact.title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <contact.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {contact.title}
              </span>
              <span className="font-semibold">{contact.info}</span>
            </div>
          ))}
        </div>

        <FormContacto />
      </div>
    </section>
  );
};

export default Contacto;
