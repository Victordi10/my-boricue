import React from 'react';


const Parrafo = ({ children, clas, color, textAlign, style  }) => {
    return (
        <p
            className={`text-gray-500 leading-relaxed 
                mb-4 text-base md:text-lg 
                transition-all duration-300 ease-in-out 
                hover:text-black ${clas}`}
            style={{color: color, ...style}}
        >
            {children}
        </p>
    )
}

export default Parrafo;