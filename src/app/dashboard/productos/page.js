'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Heart, MessageCircle, Edit, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/services/axiosInstance';
import ProductCard from '@/components/ProductCard';
import { ErrorScreen, InlineMessage } from '@/components/ShowMensaje';
import { useGlobalState } from '@/context/GlobalStateContext';
import Titulo from '@/ui/Titulo';
import Parrafo from '@/ui/Parrafo';


const exampleProducts = [
    {
        idProducto: 1,
        nombre: "Cámara Digital Profesional",
        descripcion: "Cámara DSLR con sensor de 24MP, grabación de video 4K y conectividad WiFi. Perfecta para fotógrafos profesionales y aficionados exigentes.",
        precio: "899.99",
        categoria: "Electrónica",
        imagen: "camara-digital.jpg",
        stock: 15,
        fechaPublicacion: "2025-03-15"
    },
    {
        idProducto: 2,
        nombre: "Zapatillas Running Ultralight",
        descripcion: "Zapatillas deportivas ligeras con tecnología de amortiguación avanzada. Diseñadas para corredores de larga distancia y uso diario.",
        precio: "129.95",
        categoria: "Deportes",
        imagen: "zapatillas-running.jpg",
        stock: 28,
        fechaPublicacion: "2025-04-02"
    },
    {
        idProducto: 3,
        nombre: "Set de Muebles para Jardín",
        descripcion: "Conjunto de mesa y 4 sillas para exterior, fabricado con materiales resistentes a la intemperie. Ideal para terrazas y jardines.",
        precio: "349.50",
        categoria: "Hogar",
        imagen: "muebles-jardin.jpg",
        stock: 7,
        fechaPublicacion: "2025-03-22"
    }
];

// Componente de estado vacío
const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <div className="bg-uno p-4 rounded-full mb-4">
            <Image
                src="/images/empty-box.png"
                alt="Empty box"
                width={80}
                height={80}
            />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no tienes publicaciones</h3>
        <p className="text-gray-600 text-center max-w-md mb-6">
            Comienza a vender tus productos creando tu primera publicación
        </p>
        <Link
            href="/crear-publicacion"
            className="px-6 py-3 bg-dos text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
        >
            <Plus size={18} className="mr-2" />
            Crear publicación
        </Link>
    </div>
);

// Componente principal - Página de Mis Publicaciones
export default function MisPublicaciones() {
    const { userId } = useGlobalState();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para cargar productos
    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/dashboard/productos/${userId}`);
            const data = response.data.data
            console.log('productos', data)

            setProducts(data);

            setError(null);
        } catch (err) {
            console.error("Error al cargar los productos:", err);
            setError("No se pudieron cargar tus publicaciones. Intenta de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        if (userId) {
            loadProducts();
        }
    }, [userId]);

    // Función para eliminar producto
    const handleDeleteProduct = async (productId) => {
        try {
            await api.delete(`/api/publicaciones/${productId}`);
            // Actualizar la lista de productos después de eliminar
            setProducts(products.filter(p => p.idProducto !== productId));
        } catch (err) {
            console.error("Error al eliminar el producto:", err);
            alert("No se pudo eliminar el producto. Intenta de nuevo más tarde.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Encabezado con degradado */}
            <div className="bg-gradient-to-r from-dos to-divisiones p-6">
                <div className="max-w-6xl mx-auto">
                    <Parrafo clas="text-white text-opacity-90 text-center mt-2 max-w-2xl mx-auto">
                        Gestiona tus productos publicados en la plataforma y controla tus ventas
                    </Parrafo>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-6xl mx-auto py-8 px-4">
                {/* Filtros y botón de añadir */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="flex flex-col md:items-start items-center justify-center mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold text-gray-800 ">
                            Tus productos
                        </h2>
                        <p className="text-sm text-gray-500">Total publicaciones: {products.length}</p>
                    </div>
                    <Link
                        href="/crear-publicacion"
                        className="px-5 py-2 bg-dos text-white font-medium rounded-lg shadow-sm hover:bg-opacity-90 transition-colors flex items-center"
                    >
                        <Plus size={20} className="mr-2" />
                        Nueva publicación
                    </Link>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
                        {error}
                    </div>
                )}


                {/* Estado de carga */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dos"></div>
                    </div>
                ) : (
                    <>
                        {/* Grid de productos */}
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map(product => (
                                    <ProductCard
                                        key={product.idProducto}
                                        product={product}
                                        onDelete={handleDeleteProduct}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState />
                        )}
                    </>
                )}
            </div>

            {/* Botón flotante para añadir */}
            <div className="fixed bottom-8 right-8 md:hidden">
                <Link
                    href="/crear-publicacion"
                    className="flex items-center justify-center h-14 w-14 rounded-full bg-dos text-white shadow-lg hover:bg-opacity-90 transition-colors"
                >
                    <Plus size={24} />
                </Link>
            </div>
        </div>
    );
}