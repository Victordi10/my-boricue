import React from 'react';

const Titulo = ({ texto, className, style  }) => {
    return (
        <h2
            className={`text-2xl font-bold 
                md:text-4xl xl:text-5xl leading-tight 
                text-texto text-center
                transition-all duration-300 ease-in-out ${className}`}
                style={{...style}}
        >
            {texto}
        </h2>
    )
}

export default Titulo;