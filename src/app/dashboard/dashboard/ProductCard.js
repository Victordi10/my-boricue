// src/components/ProductCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, ShoppingCart, Tag, Gift, RefreshCw } from 'lucide-react';

const ProductCard = ({ product, userId, getCategoryDisplay, getMaterialDisplay }) => {
    // Determine button text and icon based on category
    const getActionButton = () => {
        switch (product.categoria?.toLowerCase()) {
            case 'venta':
                return (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Comprar
                    </button>
                );
            case 'donacion':
                return (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center">
                        <Gift className="h-4 w-4 mr-1" />
                        Solicitar
                    </button>
                );
            case 'intercambio':
                return (
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Intercambiar
                    </button>
                );
            default:
                return (
                    <button className="px-4 py-2 bg-divisiones text-white rounded-md hover:bg-dos transition-colors duration-300 flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Ver detalle
                    </button>
                );
        }
    };

    // Get badge color based on category
    const getBadgeColor = () => {
        if (product.usuario_id === userId) return 'bg-dos text-white';

        switch (product.categoria?.toLowerCase()) {
            case 'venta': return 'bg-green-500 text-white';
            case 'donacion': return 'bg-blue-500 text-white';
            case 'intercambio': return 'bg-purple-500 text-white';
            default: return 'bg-uno text-texto';
        }
    };

    return (
        <div className="group bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
            {/* Product Badge */}
            <div className="relative">
                <div className="absolute top-0 left-0 z-10 m-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}>
                        {product.usuario_id === userId
                            ? <>
                                <Tag className="mr-1 h-3 w-3" />
                                Mi producto
                            </>
                            : getCategoryDisplay(product.categoria || 'Venta')}
                    </span>
                </div>

                {/* Material Badge (if available) */}
                {product.material && (
                    <div className="absolute top-0 right-0 z-10 m-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                            {getMaterialDisplay(product.material)}
                        </span>
                    </div>
                )}

                {/* Product Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                    <Image
                        src={`/images/${product.imagen || 'default-product.jpg'}`}
                        alt={product.nombre}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* Hover Actions */}
                    {product.usuario_id !== userId && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                            <div className="flex space-x-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                <Link
                                    href={`/chat?R=${product.usuario_id}`}
                                    className="bg-white text-dos p-3 rounded-full hover:bg-dos hover:text-white transition-colors duration-300 block"
                                    title="Chatear con vendedor"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                </Link>
                                <button
                                    className="bg-white text-dos p-3 rounded-full hover:bg-dos hover:text-white transition-colors duration-300"
                                    title="Añadir a favoritos"
                                >
                                    <Heart className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                <h3 className="text-xl font-semibold text-texto mb-2 line-clamp-1">{product.nombre}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.descripcion}</p>
                <div className="flex justify-between items-center">
                    <span className="text-dos font-bold text-lg">
                        {product.categoria?.toLowerCase() === 'donacion'
                            ? 'Gratis'
                            : product.precio || 'Consultar precio'}
                    </span>
                    {product.usuario_id !== userId && getActionButton()}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;