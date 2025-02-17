import React from 'react';
import { motion } from "framer-motion"

const Seccion = ({ children, className }) => {
    return (
        <motion.section
            className={`bg-Fondo flex flex-col w-full p-6 py-12 md:p-12 rounded-2xl shadow-xl space-y-6
                max-w-screen-lg mx-auto min-h-[50vh]
                bg-opacity-90
                border border-gray-200
                ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            {children}
        </motion.section>
    )
}
export default Seccion