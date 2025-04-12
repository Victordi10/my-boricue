'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Heart, MessageCircle, Edit, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/services/axiosInstance';

// Componente de tarjeta de producto
const ProductCard = ({ product, onDelete }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const handleEdit = () => {
        router.push(`/editar-publicacion/${product.idProducto}`);
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            onDelete(product.idProducto);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div
                className="relative h-48 w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Badge de categoría */}
                <span className="absolute top-2 left-2 z-10 bg-divisiones text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.categoria}
                </span>

                {/* Imagen del producto */}
                <div className="h-full w-full relative">
                    <Image
                        src={`/images/${product.imagen}`}
                        alt={product.nombre}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out"
                        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                    />

                    {/* Overlay con acciones */}
                    <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex space-x-3">
                            <button className="p-2 bg-white rounded-full hover:bg-dos hover:text-white transition-colors">
                                <MessageCircle size={20} />
                            </button>
                            <button className="p-2 bg-white rounded-full hover:bg-dos hover:text-white transition-colors">
                                <Heart size={20} />
                            </button>
                            <button className="p-2 bg-white rounded-full hover:bg-dos hover:text-white transition-colors">
                                <ShoppingCart size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Información del producto */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.nombre}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.descripcion}</p>
                <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-dos">${product.precio}</span>
                </div>

                {/* Botones de acción */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                        onClick={handleEdit}
                        className="flex items-center justify-center py-2 bg-uno text-dos font-medium rounded-lg hover:bg-opacity-80 transition-colors"
                    >
                        <Edit size={16} className="mr-1" />
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center py-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition-colors"
                    >
                        <Trash2 size={16} className="mr-1" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard