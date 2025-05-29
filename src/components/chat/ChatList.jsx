// /src/components/chat/ChatList.jsx
"use client";
import React, { useState } from 'react';
import Avatar from './Avatar';

const ChatList = ({ onSelectChat, selectedReceiverId, chats }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para formatear tiempo del último mensaje
    const formatLastMessageTime = (timestamp) => {
        if (!timestamp) return '';
        
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
            month: '2-digit'
        });
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50/50 border-r border-divisiones overflow-hidden">
            {/* Header con búsqueda mejorada */}
            <div className="p-3 bg-gradient-to-r from-uno to-uno/95 shadow-sm ">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Buscar conversaciones..."
                        className="w-full py-2 pl-12 pr-4 rounded-2xl bg-white/90 backdrop-blur-sm text-texto placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dos/30 focus:bg-white transition-all duration-300 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-dos transition-colors duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        >
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Lista de chats mejorada */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {filteredChats.length > 0 ? (
                    <div className="divide-y divide-gray-100/70">
                        {filteredChats.map((chat, index) => (
                            <div
                                key={chat.id}
                                className={`relative flex items-center p-3 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-uno/10 group ${
                                    selectedReceiverId === chat.idReceptor 
                                        ? 'bg-gradient-to-r from-uno/20 to-uno/10 border-r-4 border-dos shadow-sm' 
                                        : ''
                                }`}
                                onClick={() => onSelectChat(chat.idReceptor)}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {/* Avatar con estado mejorado */}
                                <div className="relative flex-shrink-0">
                                    <Avatar src={chat.avatar} alt={chat.name} />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                                </div>

                                {/* Contenido del chat */}
                                <div className="ml-4 flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900 truncate text-base group-hover:text-gray-800 transition-colors duration-200">
                                            {chat.name}
                                        </h3>
                                        <div className="flex flex-col items-end space-y-1">
                                            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                                {formatLastMessageTime(chat.lastMessageTime)}
                                            </span>
                                            {chat.unreadCount > 0 && (
                                                <div className="relative">
                                                    <span className="bg-gradient-to-r from-dos to-green-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                                                        {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600 truncate flex-1 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                                            {chat.lastMessage || 'Sin mensajes'}
                                        </p>
                                    </div>
                                </div>

                                {/* Indicador de selección */}
                                {selectedReceiverId === chat.idReceptor && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-dos to-green-600 rounded-r-full"></div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center px-4">
                        <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-gray-500 font-medium">
                            {searchTerm ? 'No se encontraron chats' : 'No hay conversaciones'}
                        </p>
                        {searchTerm && (
                            <p className="text-xs text-gray-400 mt-1">
                                Intenta con otro término de búsqueda
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;