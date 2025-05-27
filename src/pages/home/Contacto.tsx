import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FormContacto } from './forms/FormContacto'

const Contacto = () => {
  return (
    <section
        id="contacto"
        className="py-32 bg-gradient-to-t from-slate-900/50 to-transparent"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              ¿Listo para innovar?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Contáctanos y descubre cómo podemos transformar tu visión en una
              realidad digital exitosa
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <label
                className="bg-gradient-to-r font-bold from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-full shadow-lg shadow-cyan-500/25 border-0"
              >
                Empieza Ya
              </label>
              
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Mail,
                title: "Email",
                info: "saltaget@gmail.com",
                color: "text-cyan-400",
              },
              {
                icon: Phone,
                title: "Teléfono",
                info: "+54 387 6050-942",
                color: "text-blue-400",
              },
              {
                icon: MapPin,
                title: "Ubicación",
                info: "Salta, Argentina",
                color: "text-purple-400",
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <contact.icon className={`w-8 h-8 ${contact.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {contact.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {contact.info}
                </p>
                
              </motion.div>
            ))}
          </div>
          <FormContacto />
        </div>
      </section>
  )
}

export default Contacto