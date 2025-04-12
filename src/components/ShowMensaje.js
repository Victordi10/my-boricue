'use client'
'use client';
import { useState, useEffect, useRef } from "react";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
    XMarkIcon,
    ArrowPathIcon
} from "@heroicons/react/24/solid";

export default function ShowMensaje({ mensaje, isError = false }) {
    return (
        <>
            {mensaje && (
                <div className={`border-l-4 ${isError ? 'bg-red-50  border-red-500' : 'text-gray-700 border-green-500'} p-4 rounded`}>
                    <p className={`text-sm ${isError ? 'text-red-600' : 'text-gray-700'}`}>{mensaje}</p>
                </div>
            )}
        </>
    );
}


const VARIANTS = {
    success: {
        bg: "bg-green-50",
        border: "border-green-500",
        text: "text-green-700",
        title: "text-green-800",
        icon: CheckCircleIcon,
        iconColor: "text-green-500",
        button: "bg-green-600 hover:bg-green-700",
    },
    error: {
        bg: "bg-red-50",
        border: "border-red-500",
        text: "text-red-700",
        title: "text-red-800",
        icon: ExclamationCircleIcon,
        iconColor: "text-red-500",
        button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
        bg: "bg-yellow-50",
        border: "border-yellow-500",
        text: "text-yellow-700",
        title: "text-yellow-800",
        icon: ExclamationTriangleIcon,
        iconColor: "text-yellow-500",
        button: "bg-yellow-600 hover:bg-yellow-700",
    },
    info: {
        bg: "bg-blue-50",
        border: "border-blue-500",
        text: "text-blue-700",
        title: "text-blue-800",
        icon: InformationCircleIcon,
        iconColor: "text-blue-500",
        button: "bg-blue-600 hover:bg-blue-700",
    },
};

// Componente para mensajes en línea
export function InlineMessage({
    mensaje,
    titulo,
    variant = "info",
    statusCode = null,
    timeout = 0,
    dismissible = true,
    onClose = () => { },
}) {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);
    const timerRef = useRef(null);

    const currentVariant = VARIANTS[variant] || VARIANTS.info;
    const IconComponent = currentVariant.icon;

    // Handle auto-dismiss with timeout
    useEffect(() => {
        if (timeout > 0 && isVisible) {
            timerRef.current = setTimeout(() => {
                handleDismiss();
            }, timeout);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [timeout, isVisible]);

    // Handle dismiss animation
    const handleDismiss = () => {
        setIsLeaving(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    if (!mensaje || !isVisible) return null;

    return (
        <div
            role="alert"
            aria-live="assertive"
            className={`
        ${isLeaving ? "opacity-0 scale-95" : "opacity-100 scale-100"}
        transition-all duration-300 ease-in-out
      `}
        >
            <div
                className={`
          flex items-start gap-3 p-4 rounded-md border-l-4 shadow-sm
          ${currentVariant.bg} ${currentVariant.border} ${currentVariant.text}
        `}
            >
                {/* Icono */}
                <div className="flex-shrink-0 pt-0.5">
                    <IconComponent className={`w-5 h-5 ${currentVariant.iconColor}`} />
                </div>

                {/* Contenido */}
                <div className="flex-grow text-sm space-y-0.5">
                    {(titulo || statusCode) && (
                        <div className={`block font-medium ${currentVariant.title}`}>
                            {titulo}
                            {statusCode && !titulo && `Código: ${statusCode}`}
                            {statusCode && titulo && ` (${statusCode})`}
                        </div>
                    )}
                    <p>{mensaje}</p>
                </div>

                {/* Botón de cierre */}
                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className={`flex-shrink-0 ml-2 p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentVariant.text}`}
                        aria-label="Cerrar"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Barra de progreso para timeout */}
            {timeout > 0 && (
                <div className="relative h-1 w-full -mt-1 rounded-b-md overflow-hidden">
                    <div
                        className={`absolute top-0 left-0 h-full ${currentVariant.iconColor}`}
                        style={{
                            width: "100%",
                            animation: `shrink ${timeout}ms linear forwards`,
                        }}
                    />
                </div>
            )}
        </div>
    );
}

// Componente de pantalla completa para errores críticos
export function ErrorScreen({
    title = "Ha ocurrido un error",
    message = "Lo sentimos, ha ocurrido un error inesperado.",
    statusCode = null,
    variant = "error",
    retryAction = null,
    homeLink = "/",
}) {
    const currentVariant = VARIANTS[variant] || VARIANTS.error;
    const IconComponent = currentVariant.icon;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-lg w-full space-y-8 text-center">
                <div>
                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
                        <IconComponent className={`h-16 w-16 ${currentVariant.iconColor}`} aria-hidden="true" />
                    </div>

                    <h1 className="mt-6 text-3xl font-bold text-gray-900">
                        {title}
                        {statusCode && ` (${statusCode})`}
                    </h1>

                    <p className="mt-3 text-lg text-gray-600">
                        {message}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {retryAction && (
                        <button
                            onClick={retryAction}
                            className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${currentVariant.button} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100`}
                        >
                            <ArrowPathIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                            Intentar de nuevo
                        </button>
                    )}

                    {/* <a
                        href={homeLink}
                        className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                        Volver al inicio
                    </a> */}
                </div>
            </div>
        </div>
    );
}

// Ejemplo de uso para crear un componente de Error 404 específico
export function NotFoundError({ retryAction = null }) {
    return (
        <ErrorScreen
            title="Página no encontrada"
            message="Lo sentimos, la página que estás buscando no existe o ha sido movida."
            statusCode={404}
            variant="warning"
            retryAction={retryAction}
        />
    );
}