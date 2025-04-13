'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Heart, MessageCircle, Edit, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/services/axiosInstance';
import ProductCard from './ProductCard';
import { ErrorScreen, InlineMessage } from '@/components/ShowMensaje';
import { useGlobalState } from '@/context/GlobalStateContext';
import Titulo from '@/ui/Titulo';
import Parrafo from '@/ui/Parrafo';
import Modal from '@/ui/Modal';
import CreatePostButton from './crearProducto';
import Loader from '@/components/Loader';
import { EditPostModal } from './editProducto';

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
        <CreatePostButton />
    </div>
);

// Componente principal - Página de Mis Publicaciones
export default function MisPublicaciones() {
    const { userId } = useGlobalState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productSelect, setProductSelect] = useState(null)

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

    const handleEditSuccess = () => {
        setLoading(true);
        loadProducts().finally(() => {
            setLoading(false);
            setAlert({ message: 'Editado exitosamente', variant: 'success' });
            setIsModalOpen(false);
        });
    };


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

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

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
                    <CreatePostButton />
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
                        {error}
                    </div>
                )}


                {/* Estado de carga */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader />
                        <p>Cargando tus productos...</p>
                    </div>
                ) : (
                    <>
                        {/* Grid de productos */}
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map(product => (
                                    <ProductCard
                                        key={product.idProducto}
                                        product={product}
                                        onDelete={handleDeleteProduct}
                                        setProductSelect={setProductSelect}
                                        handleOpen={handleOpen}
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
                <CreatePostButton
                    variant='icon'
                />
            </div>

            <EditPostModal
                isOpen={isModalOpen}
                onClose={handleClose}
                productData={productSelect}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
}