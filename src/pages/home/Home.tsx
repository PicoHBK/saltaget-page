import Header from "@/components/Header";
import { CgWebsite } from "react-icons/cg";
import { TbAppsFilled } from "react-icons/tb";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { AiOutlineApi } from "react-icons/ai";
import { MdAutoAwesomeMosaic } from "react-icons/md";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieAnim from "../../assets/saltagetanim.json";

const Home = () => {
  return (
    <section>
      <div className="min-h-screen bg-[linear-gradient(30deg,#010223_30%,black)] text-center">
        <Header />
        <section className="flex flex-col w-full items-center">
          <div className="max-w-4xl flex flex-col pt-32">
            <h1 className="text-5xl font-extrabold text-white font lg:text-8xl">
              SALTAGET
            </h1>
            <h3 className="text-slate-400 font-semibold text-3xl">
              Soluciones Innovadoras
            </h3>
            <p className="text-slate-200 font-bold">
              Desarrollamos software a medida, proporcionando tecnología
              avanzada y soluciones eficientes para impulsar el crecimiento y la
              transformación digital.
            </p>
          </div>
        </section>
      </div>
      <div id="servicios" className="flex flex-col w-full bg-slate-100 py-10 gap-10">
        <h1 className="font-semibold text-gray-700 text-5xl text-center">
          Servicios
        </h1>
        <div className="flex flex-wrap gap-10 justify-center">
          <div className="flex flex-col text-start max-w-60 justify-between h-72 p-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-slate-400 text-2xl font-bold">
                Desarrollo Web
              </h2>
              <p className="text-base font-medium text-slate-700">
                Desarrollo de sitios y aplicaciones web adaptados a tus
                necesidades, optimizados para rendimiento y escalabilidad
              </p>
            </div>
            <CgWebsite className="text-slate-400 text-5xl" />
          </div>
          <div className="flex flex-col text-start max-w-60 justify-between h-72 p-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-slate-400 text-2xl font-bold">
                Desarrollo de Software a Medida
              </h2>
              <p className="text-base font-medium text-slate-700">
                Creamos soluciones personalizadas, adaptadas a las necesidades
                específicas de tu negocio para mejorar procesos y resultados
              </p>
            </div>
            <TbAppsFilled className="text-slate-400 text-5xl" />
          </div>
          <div className="flex flex-col text-start max-w-60 justify-between h-72 p-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-slate-400 text-2xl font-bold">E-commerce</h2>
              <p className="text-base font-medium text-slate-700">
                Desarrollo de tiendas online con pasarelas de pago seguras,
                enfocadas en la conversión y la experiencia de compraados
              </p>
            </div>
            <MdOutlineLocalGroceryStore className="text-slate-400 text-5xl" />
          </div>
          <div className="flex flex-col text-start max-w-60 justify-between h-72 p-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-slate-400 text-2xl font-bold">
                Integraciones API
              </h2>
              <p className="text-base font-medium text-slate-700">
                Conectamos tu plataforma con otros servicios y sistemas externos
                para mejorar su funcionalidad y alcance
              </p>
            </div>
            <AiOutlineApi className="text-slate-400 text-5xl" />
          </div>
          <div className="flex flex-col text-start max-w-60 justify-between h-72 p-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-slate-400 text-2xl font-bold">
                Automatización de Procesos
              </h2>
              <p className="text-base font-medium text-slate-700">
                Desarrollamos soluciones que optimizan tareas repetitivas,
                mejorando la eficiencia operativa de tu negocio{" "}
              </p>
            </div>
            <MdAutoAwesomeMosaic className="text-slate-400 text-5xl" />
          </div>
        </div>
      </div>
      <div id="nosotros" className="flex flex-col w-full bg-white py-10">
        <h1 className="font-semibold text-gray-700 text-5xl text-center">
          Quienes Somos
        </h1>
        <div className="flex flex-col w-full lg:flex-row">
          <div className="flex flex-col w-full justify-center px-10">
            <h2 className="text-4xl text-slate-400 font-bold text-center">
              Creando el futuro del software
            </h2>
            <p className="text-lg text-slate-600 font-bold text-center">
              En Saltaget, desarrollamos soluciones web, de escritorio y móviles
              con tecnología moderna y escalable. Nuestro equipo convierte ideas
              en productos digitales eficientes y de alto rendimiento
            </p>
          </div>
          <div className="flex flex-col w-full">
            <Player
              src={lottieAnim}
              className="w-full h-full object-cover"
              autoplay
              loop
            ></Player>
          </div>
        </div>
      </div>
      <footer className="h-20 flex w-full bg-gradient-to-r from-blue-950 to-black justify-center items-center">
        <p className="text-white font-semibold"><span className="font-bold text-slate-400">SaltaGet©</span> Todos los derechos reservados.</p>
      </footer>
    </section>
  );
};

export default Home;
