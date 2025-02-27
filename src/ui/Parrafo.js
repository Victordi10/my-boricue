import React from 'react';
import { motion } from "framer-motion"


const Parrafo = ({ children, clas, color, textAlign  }) => {
    return (
        <p
            className={`text-gray-500 leading-relaxed 
                mb-4 text-sm sm:text-base md:text-lg 
                transition-all duration-300 ease-in-out 
                hover:text-black ${clas}`}
            style={{color: color, textAlign: textAlign}}
        >
            {children}
        </p>
    )
}

export default Parrafo;