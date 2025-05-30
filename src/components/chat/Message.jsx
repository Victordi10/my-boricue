import React from 'react';
import Avatar from './Avatar';

const Message = ({ message, userId, avatarContact }) => {
    const isOwn = Number(message.idEmisor) === Number(userId);

    
    //console.log("Es propio:", isOwn);

    // Función para formatear la fecha de manera más legible
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Ahora';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;

        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const messageClasses = isOwn
        ? "bg-dos text-white shadow-md shadow-dos/20 rounded-2xl rounded-br-md ml-auto transform transition-all duration-200 hover:shadow-md hover:shadow-dos/30"
        : "bg-uno text-texto shadow-md shadow-uno/20 rounded-2xl rounded-bl-md transform transition-all duration-200 hover:shadow-md hover:shadow-uno/30";

    const wrapperClasses = isOwn
        ? "flex flex-col items-end animate-fade-in-right"
        : "flex flex-col items-start animate-fade-in-left";

    return (
        <div className={`mb-6 max-w-[85%] sm:max-w-[75%] ${wrapperClasses}`}>
            {!isOwn && (
                <div className="flex items-center mb-2 ml-1">
                    <div className="relative">
                        <Avatar src={avatarContact} alt={message.nombreContacto} size="sm" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <span className="ml-3 text-sm font-semibold text-gray-700 tracking-wide">
                        {message.nombreContacto}
                    </span>
                </div>
            )}

            <div className={`relative px-4 py-3 ${messageClasses} backdrop-blur-sm`}>
                {/* Indicador de mensaje propio */}
                {isOwn && (
                    <div className="absolute -right-1 bottom-3 w-0 h-0 border-l-[8px] border-l-dos border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                )}

                {/* Indicador de mensaje de otros */}
                {!isOwn && (
                    <div className="absolute -left-1 bottom-3 w-0 h-0 border-r-[8px] border-r-uno border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                )}

                <div className="relative z-10">
                    <p className="break-words leading-relaxed text-[15px]">
                        {message.mensaje}
                    </p>

                    {message.url_archivo && (
                        <div className="mt-3 rounded-xl overflow-hidden bg-black/5 p-1">
                            <img
                                src={message.url_archivo}
                                alt="Imagen adjunta"
                                className="w-full h-auto max-h-72 object-cover rounded-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                                onClick={() => window.open(message.url_archivo, '_blank')}
                            />
                        </div>
                    )}

                    <div className={`flex items-center gap-2 mt-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-xs font-medium tracking-wide ${isOwn
                                ? 'text-white/70'
                                : 'text-gray-500'
                            }`}>
                            {formatTimestamp(message.fecha)}
                        </span>

                        {/* Estado de mensaje (solo para mensajes propios) */}
                        {isOwn && (
                            <div className="flex space-x-0.5">
                                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;