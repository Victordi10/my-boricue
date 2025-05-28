// /src/components/chat/ChatList.jsx
"use client";
import React, { useState } from 'react';
import Avatar from './Avatar';

// /src/data/mockData.js
export const mockChats = [
    {
        id: 1,
        name: "Juan Pérez",
        avatar: "https://i.pravatar.cc/150?img=1",
        lastMessage: "¿Cómo estás hoy?",
        lastMessageTime: "10:30",
        unreadCount: 2,
    },
    {
        id: 2,
        name: "María García",
        avatar: "https://i.pravatar.cc/150?img=5",
        lastMessage: "¿Nos vemos mañana?",
        lastMessageTime: "09:15",
        unreadCount: 0,
    },
    {
        id: 3,
        name: "Carlos López",
        avatar: "https://i.pravatar.cc/150?img=8",
        lastMessage: "Revisa el documento que te envié",
        lastMessageTime: "Ayer",
        unreadCount: 0,
    },
    {
        id: 4,
        name: "Ana Martínez",
        avatar: "https://i.pravatar.cc/150?img=9",
        lastMessage: "Gracias por la ayuda",
        lastMessageTime: "Ayer",
        unreadCount: 0,
    },
    {
        id: 5,
        name: "Pedro Rodríguez",
        avatar: "https://i.pravatar.cc/150?img=3",
        lastMessage: "¿Listo para la reunión?",
        lastMessageTime: "Lunes",
        unreadCount: 0,
    },
];


const ChatList = ({ onSelectChat, selectedChatId }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = mockChats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-white border-r border-divisiones">
            <div className="p-3 bg-uno">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar o empezar un nuevo chat"
                        className="w-full p-2 pl-10 rounded-lg bg-white text-texto focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredChats.length > 0 ? (
                    filteredChats.map(chat => (
                        <div
                            key={chat.id}
                            className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${selectedChatId === chat.id ? 'bg-uno' : ''
                                }`}
                            onClick={() => onSelectChat(chat.id)}
                        >
                            <Avatar src={chat.avatar} alt={chat.name} />
                            <div className="ml-3 flex-1 overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-texto truncate">{chat.name}</h3>
                                    <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                                    {chat.unreadCount > 0 && (
                                        <span className="bg-dos text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-3 text-center text-gray-500">
                        No se encontraron chats
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;
