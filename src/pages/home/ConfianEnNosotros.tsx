import sijacLogo from "@/assets/empresas/sijac.png";
import sypmLogo from "@/assets/empresas/sypm.png";

/**
 * Logos de empresas que confían en SaltaGet.
 *
 * Para sumar un logo: poné el PNG en src/assets/empresas/, importalo arriba
 * y agregá una entrada { name, logo } al array.
 */
type Client = { name: string; logo: string };

const CLIENTS: Client[] = [
  { name: "Sijac Consultoras", logo: sijacLogo },
  { name: "Servicios y Proyectos Mineros SRL", logo: sypmLogo },
];

// Repetimos la lista para llenar el ancho y lograr un loop continuo.
const SEQUENCE = Array.from({ length: 4 }, () => CLIENTS).flat();

const ClientLogo = ({ client }: { client: Client }) => (
  <div className="flex shrink-0 items-center gap-3 px-8">
    <img
      src={client.logo}
      alt={client.name}
      className="h-11 w-11 object-contain sm:h-12 sm:w-12"
    />
    <span className="whitespace-nowrap text-base font-semibold tracking-tight text-slate-900">
      {client.name}
    </span>
  </div>
);

const ConfianEnNosotros = () => {
  return (
    <section className="py-12 sm:py-16">
      {/* Título sobre el fondo de la web (no ocupa el blanco) */}
      <div className="container mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Confían en nosotros
        </p>
      </div>

      {/* Banda blanca full-width: solo los logos */}
      <div className="mt-7 w-full bg-white py-7">
        <div className="marquee-track group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="animate-marquee flex w-max items-center">
            {[...SEQUENCE, ...SEQUENCE].map((client, i) => (
              <ClientLogo key={`${client.name}-${i}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfianEnNosotros;
