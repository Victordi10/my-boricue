"use client";

import React, { useState } from "react";
import Image from "next/image";

const buttonColors = {
  Comprar: "bg-green-500 hover:bg-green-600",
  "Añadir al carro": "bg-blue-500 hover:bg-blue-600",
  Donar: "bg-purple-500 hover:bg-purple-600",
  Gratis: "bg-gray-500 hover:bg-gray-600",
};

const categoryLabels = {
  Venta: { text: "En venta", color: "bg-green-500" },
  Donacion: { text: "Donar", color: "bg-gray-500" },
  Intercambio: { text: "Intercambio", color: "bg-yellow-500" },
};


const VentaCard = ({
  title,
  description,
  imageUrl,
  price,
  idProducto,
  category = "Venta", // valores posibles: "Venta", "Donacion", "Gratis"
  actions = [],
}) => {
  const [hovered, setHovered] = useState(false);
  const categoryInfo = categoryLabels[category] || categoryLabels["Venta"];

  return (
    <div className="flex flex-col w-72 md:w-[30%] h-80 items-center rounded-lg shadow-md bg-white transition-transform duration-300 ease-in-out hover:scale-105">
      
      {/* Imagen con etiqueta de categoría */}
      <div
        className="relative h-40 w-full overflow-hidden rounded-t-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={160}
            className="object-cover w-full h-40 transition-opacity duration-300 ease-in-out hover:opacity-75"
          />
        )}

        {/* Etiqueta */}
        <span className={`absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded ${categoryInfo.color}`}>
          {categoryInfo.text}
        </span>
      </div>

      {/* Contenido */}
      <div className="px-4 py-3 text-center w-full">
        <h3 className="font-bold text-lg mb-1 text-gray-800 text-left">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 text-left">{description}</p>

        {/* Precio */}
        {price && category === "Venta" && (
          <div className="flex justify-between items-center w-full px-2 mb-2">
            <span className="text-md font-semibold text-gray-700">${price}</span>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-2 justify-center flex-wrap">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`text-white px-3 py-1 rounded text-sm ${
                buttonColors[action.label] || "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VentaCard;
