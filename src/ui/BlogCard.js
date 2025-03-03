'use client'
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const BlogCard = ({ title, description, imageUrl }) => {
  return (
    <div className=" max-w-sm flex flex-col w-auto items-center overflow-hidden rounded md:w-[33%] shadow-lg bg-fondo transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="relative h-48 w-full">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 ease-in-out hover:opacity-75"
          />
        )}
      </div>
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  )
}

export default BlogCard

const BlogText = ({ title, description }) => {
  return (
    <div className="max-w-sm flex flex-col w-auto items-center overflow-hidden rounded md:w-[33%] shadow-lg bg-fondo p-6 transition-transform duration-300 ease-in-out hover:scale-105">
      <h3 className="font-bold text-xl mb-2 text-gray-800 text-center">{title}</h3>
      <p className="text-gray-600 text-base text-center">{description}</p>
    </div>
  );
};

export { BlogText };

const BlogInfo = ({ title, description, imageUrl }) => {
  return (
    <div className="flex flex-col w-full max-w-2xl items-center overflow-hidden rounded-lg shadow-lg bg-fondo transition-transform duration-300 ease-in-out hover:translate-y-2">
      {imageUrl && (
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 ease-in-out hover:opacity-75"
          />
        </div>
      )}
      <div className="w-full px-6 py-4 text-center">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  );
};

export { BlogInfo };


{/*preguntas*/}
const BlogPregunta = ({ title, description, imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-300">
      {/* Barra de la pregunta */}
      <div 
        className="flex justify-between items-center p-4 bg-fondo cursor-pointer hover:bg-gray-200 transition" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      
      {/* Contenido desplegable */}
      {isOpen && (
        <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-md">
          {imageUrl && (
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
              <Image 
                src={imageUrl} 
                alt={title} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-md"
              />
            </div>
          )}
          <p className="text-gray-600 text-base mt-2 md:mt-0 md:ml-4">{description}</p>
        </div>
      )}
    </div>
  );
};

export { BlogPregunta };

