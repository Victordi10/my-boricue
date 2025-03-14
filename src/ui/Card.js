import React from "react"
import Image from "next/image"
import Parrafo from "./Parrafo"
import { ArrowRight, Sparkles } from "lucide-react"

const MaterialCard = ({ title, description, imageUrl }) => {
  return (
    <div className="flex flex-col w-80 md:w-[33%] h-80 items-center  rounded  shadow-lg bg-fondo transition-transform duration-300 ease-in-out hover:scale-105">
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

export default MaterialCard


const BlogCard = ({ title, description, category = "Blog" }) => {
  return (
    <div className="group relative w-full max-w-sm mx-auto overflow-hidden">
      {/* Card Container */}
      <div
        className="relative z-10 bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 
        hover:shadow-xl hover:-translate-y-1 border border-gray-100"
      >
        {/* Decorative Elements */}
        <div
          className="absolute -top-6 -right-6 w-12 h-12 bg-green-100 rounded-full opacity-70 
          transition-transform duration-300 group-hover:scale-150"
        />
        <div
          className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-100 rounded-full opacity-50 
          transition-transform duration-300 group-hover:scale-150"
        />

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-sm 
            font-medium bg-gradient-to-r from-green-50 to-blue-50 text-green-800
            border border-green-100"
          >
            <Sparkles className="w-4 h-4 mr-1 text-green-600" />
            {category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-green-600 
          transition-colors duration-300"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">{description}</p>

        {/* Read More Link */}
        <div className="flex items-center justify-end">
          <button
            className="inline-flex items-center text-sm font-medium text-green-600 
            hover:text-green-700 transition-colors duration-200 group/button"
          >
            Leer más
            <ArrowRight
              className="w-4 h-4 ml-1 transition-transform duration-200 
              group-hover/button:translate-x-1"
            />
          </button>
        </div>

        {/* Hover Effect Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-50/0 via-white/5 to-blue-50/0 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </div>
  )
}





export { BlogCard };
