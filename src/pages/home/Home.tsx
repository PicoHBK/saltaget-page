import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Badge,
  CheckCircle,
  ChevronDown,
  Code,
  Link2,
  Monitor,
  Network,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

import logoSG from "../../assets/logo.png";
import Contacto from "./Contacto";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: ((e.clientX / window.innerWidth) * 2 - 1),
        y: ((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Flowing Lines Background */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="flowGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
            </linearGradient>
            <linearGradient
              id="flowGradient2"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.2)" />
              <stop offset="100%" stopColor="rgba(0, 255, 255, 0.1)" />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,400 Q300,200 600,300 T1200,250"
            stroke="url(#flowGradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />

          <motion.path
            d="M0,300 Q400,100 800,200 T1200,150"
            stroke="url(#flowGradient2)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />

          <motion.path
            d="M0,500 Q200,300 500,400 T1200,350"
            stroke="rgba(0, 255, 255, 0.2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
          />

          {/* Multiple flowing lines for depth */}
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0,${200 + i * 50} Q${300 + i * 100},${100 + i * 30} ${
                600 + i * 50
              },${250 + i * 20} T1200,${200 + i * 25}`}
              stroke={`rgba(${59 + i * 20}, ${130 + i * 15}, 246, ${
                0.1 + i * 0.02
              })`}
              strokeWidth={1 + i * 0.2}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 4 + i * 0.5,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Mouse-following gradient orb */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          style={{
            left: `${50 + mousePosition.x * 10}%`,
            top: `${50 + mousePosition.y * 10}%`,
            transform: "translate(-50%, -50%)",
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      </div>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-slate-900/20 backdrop-blur-xl border-b border-cyan-500/20"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                SaltaGet
              </span>
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {["Inicio","Nosotros" ,"Servicios","Contacto"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-cyan-400 transition-colors relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -2 }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                  </motion.a>
                )
              )}
            </div>
          </div>
        </div>
      </motion.nav>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <motion.div
          style={{ y: y1 }}
          className="text-center z-10 max-w-5xl mx-auto px-6"
        >
          {/* Logo Principal */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 1.5,
            }}
            className="mb-8"
          >
            <div className="flex justify-center">
              <img
                src={logoSG}
                alt="SaltaGet Logo"
                className="w-50 h-50 object-contain"
              />
            </div>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <motion.span
              className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              style={{ backgroundSize: "200% auto" }}
            >
              SaltaGet
            </motion.span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl md:text-4xl font-semibold mb-8 text-cyan-300"
          >
            Desarrollos y Soluciones Informáticas
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            Transformamos ideas en soluciones digitales innovadoras.
            Desarrollamos software a medida con tecnología de vanguardia para
            impulsar el crecimiento de tu empresa.
          </motion.p>

          {/* Botones CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-cyan-500/25 border-0"
              >
                Comenzar Proyecto
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16"
          >
            {[
              { number: "10+", label: "Proyectos" },
              { number: "100%", label: "Satisfacción" },
              { number: "3+", label: "Años" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center text-cyan-400"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>
      {/* About Section - WHITE BACKGROUND */}
      <section
        id="nosotros"
        className="py-32 bg-gradient-to-b from-white to-gray-50 text-gray-900"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#06b6d4_1px,transparent_1px),linear-gradient(-45deg,#06b6d4_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >

            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Innovación y Experiencia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos un equipo apasionado por la tecnología, comprometidos con
              transformar ideas en soluciones digitales exitosas
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Creciendo con cada proyecto
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Somos un equipo joven de desarrolladores y profesionales de
                tecnología con base en Salta, apasionados por crear soluciones
                digitales que marquen la diferencia. Apostamos al trabajo bien
                hecho, la mejora continua y la cercanía con cada cliente.
              </p>

              <div className="space-y-4">
                {[
                  "Comunicación cercana y trato personalizado",
                  "Soluciones a medida, adaptadas a cada necesidad",
                  "Compromiso real con cada proyecto",
                  "Acompañamiento y soporte post-entrega",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: "10+", label: "Proyectos", icon: "🚀" },
                { number: "100%", label: "Satisfacción Cliente", icon: "⭐" },
                { number: "24/7", label: "Soporte Técnico", icon: "🛠️" },
                { number: "3+", label: "Años Experiencia", icon: "📈" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3">{stat.icon}</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="servicios" className="py-32 relative">
        <motion.div style={{ y: y2 }} className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm mb-6">
              Nuestros Servicios
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Soluciones Tecnológicas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ofrecemos un amplio rango de servicios para cubrir todas tus
              necesidades tecnológicas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: "Desarrollo Web",
                description:
                  "Desarrollo de sitios y aplicaciones web adaptados a tus necesidades, optimizados para rendimiento y escalabilidad",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: Code,
                title: "Desarrollo de Software a Medida",
                description:
                  "Creamos soluciones personalizadas, adaptadas a las necesidades específicas de tu negocio para mejorar procesos y resultados",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                icon: ShoppingCart,
                title: "E-commerce",
                description:
                  "Desarrollo de tiendas online con pasarelas de pago seguras, enfocadas en la conversión y la experiencia de compra",
                gradient: "from-pink-500 to-red-500",
              },
              {
                icon: Link2,
                title: "Integraciones API",
                description:
                  "Conectamos tu plataforma con otros servicios y sistemas externos para mejorar su funcionalidad y alcance",
                gradient: "from-purple-500 to-blue-600",
              },
              {
                icon: Zap,
                title: "Automatización de Procesos",
                description:
                  "Desarrollamos soluciones que optimizan tareas repetitivas, mejorando la eficiencia operativa de tu negocio",
                gradient: "from-yellow-500 to-orange-600",
              },
              {
                icon: Network, // Reemplazalo por el ícono que uses en tu librería (ej. 'Wifi' o 'Server')
                title: "Redes de Telecomunicaciones",
                description:
                  "Diseño, instalación y mantenimiento de redes de datos y telecomunicaciones para una conectividad eficiente y segura",
                gradient: "from-green-500 to-blue-500",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-slate-800/30 border-cyan-500/20 backdrop-blur-xl hover:bg-slate-800/50 hover:border-cyan-400/40 transition-all duration-500 h-full">
                  <CardContent className="p-8">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* Process Section - WHITE BACKGROUND */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 text-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-4 py-2 text-sm mb-6">
              Nuestro Proceso
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Cómo Trabajamos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un proceso estructurado y transparente que garantiza resultados
              excepcionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Análisis",
                description: "Entendemos tus necesidades y objetivos",
                icon: "🔍",
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Diseño",
                description: "Creamos prototipos y arquitectura",
                icon: "🎨",
                color: "from-purple-500 to-blue-500",
              },
              {
                step: "03",
                title: "Desarrollo",
                description: "Construimos tu solución con calidad",
                icon: "⚡",
                color: "from-green-500 to-teal-500",
              },
              {
                step: "04",
                title: "Entrega",
                description: "Implementamos y brindamos soporte",
                icon: "🚀",
                color: "from-orange-500 to-red-500",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0" />
                )}

                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-10"
                >
                  <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="text-4xl mb-4">{process.icon}</div>
                      <div
                        className={`text-sm font-bold bg-gradient-to-r ${process.color} bg-clip-text text-transparent mb-3`}
                      >
                        PASO {process.step}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">
                        {process.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {process.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section - WHITE BACKGROUND */}
      <section className="py-32 bg-white text-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-4 py-2 text-sm mb-6">
              Testimonios
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mayor recompensa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Cecilia Roldán",
                company: "SIJAC Consultora Legal",
                testimonial:
                  "Gracias al sistema de turnos y gestión que desarrollaron para nuestra consultora, ahora podemos organizarnos mejor y brindar una atención más ágil y eficiente a nuestros clientes.",
                rating: 5,
                avatar: "CR",
              },
              {
                name: "Georgina Lemos",
                company: "Fundación Convivir",
                testimonial:
                  "El equipo entendió perfectamente la esencia de nuestra fundación. La nueva página nos permite llegar a más personas y mostrar de forma clara nuestra misión y actividades.",
                rating: 5,
                avatar: "GL",
              },
              {
                name: "Pablo Macedo",
                company: "Lubricar y Car premium",
                testimonial:
                  "El sistema que nos desarrollaron simplificó por completo la gestión del taller y el lavadero. Ahora controlamos todo desde un solo lugar: stock, personal, caja y más.",
                rating: 5,
                avatar: "PM",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Testimonial */}
                    <p className="text-gray-700 leading-relaxed mb-6 italic">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contacto />

      <footer className="h-20 flex w-full bg-gradient-to-r from-blue-950 to-black justify-center items-center">
        <p className="text-white font-semibold">
          <span className="font-bold text-slate-400">SaltaGet©</span> Todos los
          derechos reservados.
        </p>
      </footer>
    </section>
  );
};

export default Home;
