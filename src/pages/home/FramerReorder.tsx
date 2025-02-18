import { motion } from "framer-motion"
import { useState } from "react"

function FramerReorder() {
    const [order, setOrder] = useState(initialOrder)

    const handleClick = () => {
        setOrder(shuffle(order))
    }

    return (
        <ul
            className="hidden lg:flex flex-row justify-center items-end gap-3 max-w-[1440px]list-none cursor-pointer"
            onClick={handleClick}
        >
            {order.map((backgroundColor) => (
                <motion.li
                    key={backgroundColor}
                    layout
                    transition={spring}
                    className="overflow-hidden"
                >
                    <motion.img
                        src={backgroundColor}
                        alt=""
                        className="object-cover"
                        initial={{ opacity: 0 }} // Empieza con opacidad 0
                        animate={{ opacity: 1 }} // Se anima a opacidad 1
                        transition={{ duration: 2 }} // Duración de 2 segundos
                    />
                </motion.li>
            ))}
        </ul>
    )
}

const initialOrder = [
    "https://images.pexels.com/photos/6612381/pexels-photo-6612381.jpeg",
    "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg",
    "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
    "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg",
]

/**
 * ==============   Utils   ================
 */
function shuffle(array: string[]) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

/**
 * ==============   Animations   ================
 */
const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
}

export default FramerReorder
