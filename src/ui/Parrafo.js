import React from 'react';
import { motion } from "framer-motion"

const Parrafo = ({ children, className, color }) => {
    return (
        <motion.p
            className={`text-gray-600 leading-relaxed 
                mb-4 text-justify text-base md:text-lg 
                transition-all duration-300 ease-in-out 
                hover:text-black ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{color: color}}
        >
            {children}
        </motion.p>
    )
}

export default Parrafo;