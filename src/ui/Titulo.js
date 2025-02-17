import React from 'react';
import { motion } from "framer-motion"

const Titulo = ({ texto, className, color  }) => {
    return (
        <motion.h2
            className={`text-2xl text-left font-bold 
                md:text-4xl xl:text-5xl leading-tight 
                bg-gradient-to-r from-Titulos to-Botones bg-clip-text text-transparent
                transition-all duration-300 ease-in-out ${className}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{color:color}}
        >
            {texto}
        </motion.h2>
    )
}

export default Titulo;