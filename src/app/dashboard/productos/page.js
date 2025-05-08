'use client'

import React, { useState, useEffect, useCallback } from 'react';
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
const EmptyState = ({ loadProducts }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <div className="bg-uno p-4 rounded-full mb-4">
            <Image
                src="/LogoBoricueCircular.png"
                alt="Empty box"
                width={80}
                height={80}
            />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no tienes publicaciones</h3>
        <p className="text-gray-600 text-center max-w-md mb-6">
            Comienza a vender tus productos creando tu primera publicación
        </p>
        <CreatePostButton loadProducts={loadProducts} />
    </div>
);

// Componente principal - Página de Mis Publicaciones
export default function MisPublicaciones() {
    const { userId } = useGlobalState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productSelect, setProductSelect] = useState(null)

    // Función para cargar productos
    const loadProducts = useCallback(async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await api.get(`/api/dashboard/productos/${userId}`);
            const data = response.data.data;
            console.log('productos', data);

            setProducts(data);
            setError(null);
        } catch (err) {
            console.error("Error al cargar los productos:", err);
            setError({ message: 'No se pudieron cargar tus publicaciones. Intenta de nuevo más tarde.', variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [userId]); // Solo se vuelve a crear si cambia el userId

    // Cargar productos al montar el componente
    useEffect(() => {
        if (userId) {
            loadProducts();
        }
    }, [userId, loadProducts]);

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
            await api.delete(`/api/dashboard/productos/${userId}`, {
                data: { productId },
                headers: { 'Content-Type': 'application/json' }
            })
            // Actualizar la lista de productos después de eliminar
            setProducts(products.filter(p => p.idProducto !== productId));
            setError({ message: 'Eliminado exitosamente', variant: 'success' });
        } catch (err) {
            console.error("Error al eliminar el producto:", err);
            setError({ message: 'No se pudo eliminar tus publicacion. Intenta de nuevo más tarde.', variant: 'error' });
        }
    };

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Encabezado con degradado */}
            <div className="bg-gradient-to-r max-w-6xl mx-auto w-full from-dos to-divisiones p-6">
                <Parrafo clas="text-white text-opacity-90 text-center mt-2 max-w-2xl mx-auto">
                    Gestiona tus productos publicados en la plataforma y controla tus ventas
                </Parrafo>
            </div>

            {/* Contenido principal */}
            <div className="max-w-6xl w-full mx-auto py-8 px-4">
                {/* Filtros y botón de añadir */}
                <div className="flex flex-col w-full md:flex-row justify-between items-center mb-6">
                    <div className="flex flex-col md:items-start items-center justify-center mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold text-gray-800 ">
                            Tus productos
                        </h2>
                        <p className="text-sm text-gray-500">Total publicaciones: {products.length}</p>
                    </div>
                    <CreatePostButton loadProducts={loadProducts} />
                </div>

                {/* Mensaje de error */}

                {error && (
                    <div className="mb-4">
                        <InlineMessage
                            mensaje={error.message}
                            variant={error.variant}
                            timeout={5000}
                            onClose={() => setError(null)}
                        />
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
                            <EmptyState loadProducts={loadProducts} />
                        )}
                    </>
                )}
            </div>

            {/* Botón flotante para añadir */}
            <div className="fixed bottom-8 right-8 md:hidden">
                <CreatePostButton
                    variant='icon'
                    loadProducts={loadProducts}
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