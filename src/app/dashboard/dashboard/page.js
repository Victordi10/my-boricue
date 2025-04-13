// src/app/products/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Tag,
    Heart,
    ChevronLeft,
    ChevronRight,
    Search,
    ShoppingCart,
    MessageCircle,
    Recycle,
    Gift,
    RefreshCw
} from 'lucide-react';
import api from '@/services/axiosInstance';
import { InlineMessage } from '@/components/ShowMensaje';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import Pagination from './Pagination';
import Titulo from '@/ui/Titulo';
import Parrafo from '@/ui/Parrafo';
import Loader from '@/components/Loader';
import { useGlobalState } from '@/context/GlobalStateContext';

// Category icons mapping
const CATEGORY_ICONS = {
    venta: <ShoppingCart className="h-3 w-3 mr-1" />,
    donacion: <Gift className="h-3 w-3 mr-1" />,
    intercambio: <RefreshCw className="h-3 w-3 mr-1" />
};

// Material icons mapping
const MATERIAL_ICONS = {
    carton: "📦",
    aluminio: "🥫",
    plastico: "♳",
    vidrio: "🧪",
    textil: "🧵",
    madera: "🪵",
    papel: "📄",
    otros: "🔄"
};

export default function Products() {
    const { userId } = useGlobalState()
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 8;

    useEffect(() => {
        if (userId) {
            fetchProducts();
        }
    }, [currentPage, searchTerm, selectedCategory, selectedMaterial, userId]);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get('/api/dashboard/dashboard', {
                params: {
                    page: currentPage,
                    limit: productsPerPage,
                    search: searchTerm,
                    categoria: selectedCategory,
                    material: selectedMaterial
                }
            });

            const data = response.data;

            if (data.success) {
                setProducts(data.data.productos || []);
                setTotalProducts(data.data.total || 0);
                setTotalPages(data.data.totalPages || 1);
            } else {
                setError({
                    message: data.message || 'Error al cargar los productos',
                    variant: 'error'
                });
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError({
                message: 'No pudimos conectar con el servidor. Por favor, intenta nuevamente más tarde.',
                variant: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setCurrentPage(1);
    };

    const handleMaterialChange = (value) => {
        setSelectedMaterial(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedMaterial('');
        setCurrentPage(1);
    };

    const getCategoryDisplay = (category) => {
        return (
            <span className="inline-flex items-center">
                {CATEGORY_ICONS[category.toLowerCase()] || <Tag className="h-3 w-3 mr-1" />}
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
        );
    };

    const getMaterialDisplay = (material) => {
        return (
            <span>
                {MATERIAL_ICONS[material.toLowerCase()] || "🔄"} {material}
            </span>
        );
    };

    return (
        <>
            {/* Hero Section */}
            <section className="text-center mb-6 p-4 rounded-md bg-fondo">
                <Titulo texto={'BIENVENIDO A BORICUE'} />
                <Parrafo className="" textAlign={'center'}>
                    Transforma residuos en recursos: compra, vende, dona o intercambia materiales para un futuro más sostenible
                </Parrafo>


                {/* Search and Filter Bar */}
                <ProductFilter
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                    selectedMaterial={selectedMaterial}
                    onSearchChange={handleSearch}
                    onCategoryChange={handleCategoryChange}
                    onMaterialChange={handleMaterialChange}
                    onClearFilters={clearFilters}
                    categories={[
                        { value: '', label: 'Todas las categorías' },
                        { value: 'venta', label: 'Venta' },
                        { value: 'donacion', label: 'Donación' },
                        { value: 'intercambio', label: 'Intercambio' }
                    ]}
                    materials={[
                        { value: '', label: 'Todos los materiales' },
                        { value: 'carton', label: 'Cartón' },
                        { value: 'aluminio', label: 'Aluminio' },
                        { value: 'plastico', label: 'Plástico' },
                        { value: 'vidrio', label: 'Vidrio' },
                        { value: 'textil', label: 'Textil' },
                        { value: 'madera', label: 'Madera' },
                        { value: 'papel', label: 'Papel' },
                        { value: 'otros', label: 'Otros' }
                    ]}
                />
            </section>

            {/* Products Section */}
            <section className="mb-8">
                {error && (
                    <div className="mb-6">
                        <InlineMessage
                            mensaje={error.message}
                            variant={error.variant}
                            dismissible={true}
                            timeout={5000}
                        />
                    </div>
                )}

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader />
                        <p>Cargando productos...</p>
                    </div>
                ) : products && products.length > 0 ? (
                    <div className='w-full bg-fondo p-6'>
                        {/* Products count and page indicator */}
                        <div className="flex  flex-col sm:flex-row justify-between items-center mb-4">
                            <p className="text-gray-600 mb-2 sm:mb-0">
                                Mostrando {(currentPage - 1) * productsPerPage + 1}-
                                {Math.min(currentPage * productsPerPage, totalProducts)} de {totalProducts} productos
                            </p>
                            <p className="text-gray-600">
                                Página {currentPage} de {totalPages}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product, index) => (
                                <ProductCard
                                    key={product.id || index}
                                    product={product}
                                    userId={userId}
                                    getCategoryDisplay={getCategoryDisplay}
                                    getMaterialDisplay={getMaterialDisplay}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                ) : (
                    <div className="bg-uno text-texto p-6 rounded-lg text-center">
                        <Recycle className="h-16 w-16 mx-auto mb-4 text-dos" />
                        <p className="text-lg">No hay productos disponibles con los filtros seleccionados.</p>
                        <p className="mt-2">¡Ayuda al planeta publicando tus materiales o residuos!</p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 px-4 py-2 bg-dos text-white rounded-md hover:bg-opacity-90 transition-colors duration-300"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </section>

            {/* Sustainability Impact Section */}
            <section className="my-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-texto relative inline-block">
                        Contribuye a la economía circular
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-dos"></span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Cada transacción en nuestra plataforma ayuda a reducir residuos y promueve la sostenibilidad
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-md text-center">
                        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-4">
                            <ShoppingCart className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Venta</h3>
                        <p className="text-gray-600">Publica tus residuos y materiales para que otros puedan darles una segunda vida</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md text-center">
                        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 mb-4">
                            <Gift className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Donación</h3>
                        <p className="text-gray-600">Dona materiales que ya no necesitas a personas o empresas que pueden aprovecharlos</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md text-center">
                        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-purple-100 mb-4">
                            <RefreshCw className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Intercambio</h3>
                        <p className="text-gray-600">Intercambia tus residuos y materiales con otros usuarios para un beneficio mutuo</p>
                    </div>
                </div>
            </section>
        </>
    );
}