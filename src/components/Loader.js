import React from 'react';

export default function Loader({ size = 'default', text = '' }) {
    // Opciones de tamaño
    const sizes = {
        small: 'w-6 h-6',
        default: 'w-10 h-10',
        large: 'w-16 h-16',
    };

    // Elegir el tamaño o usar el predeterminado
    const sizeClass = sizes[size] || sizes.default;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`${sizeClass} relative`}>
                {/* Círculo de fondo */}
                <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>

                {/* Círculo de progreso animado */}
                <div className="absolute inset-0 rounded-full border-2 border-dos border-t-transparent animate-spin"></div>
            </div>

            {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
        </div>
    );
}

// Componente alternativo que muestra un spinner más elaborado
export function SpinnerLoader({ variant = 'primary' }) {
    // Mapeo de variantes a colores
    const variantMap = {
        primary: 'border-dos',
        secondary: 'border-divisiones',
        success: 'border-green-500',
        error: 'border-red-500',
    };

    const borderColor = variantMap[variant] || variantMap.primary;

    return (
        <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 relative animate-pulse">
                <div className={`absolute inset-0 rounded-full border-4 ${borderColor} border-t-transparent animate-spin`}></div>
            </div>
        </div>
    );
}

// Componente que muestra un mensaje de carga con un fondo
export function LoadingScreen({ message = 'Cargando...' }) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
            <Loader size="large" />
            <p className="mt-4 text-lg font-medium text-dos">{message}</p>
        </div>
    );
}

// Componente de botón con estado de carga
export function LoadingButton({
    loading = false,
    children,
    className = '',
    disabled = false,
    ...props
}) {
    return (
        <button
            disabled={loading || disabled}
            className={`relative inline-flex items-center justify-center px-4 py-2 bg-dos hover:bg-divisiones text-white font-medium rounded-lg transition-colors ${loading ? 'opacity-80' : ''} ${className}`}
            {...props}
        >
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <Loader size="small" />
                </span>
            )}
            <span className={loading ? 'opacity-0' : ''}>{children}</span>
        </button>
    );
}