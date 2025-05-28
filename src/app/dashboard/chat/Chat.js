"use client";
import React, { useState } from 'react';
import ChatList from '@/components/chat/ChatList';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { useGlobalState } from '@/context/GlobalStateContext';
import { ChatModal } from '@/ui/Modal';

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

export const mockMessages = [
    {
        id: 1,
        chatId: 1,
        sender: "Juan Pérez",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Hola, ¿cómo estás?",
        timestamp: "10:15",
        isOwn: false,
    },
    {
        id: 2,
        chatId: 1,
        sender: "Tú",
        content: "¡Bien! ¿Y tú?",
        timestamp: "10:16",
        isOwn: true,
    },
    {
        id: 3,
        chatId: 1,
        sender: "Juan Pérez",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Todo muy bien, gracias por preguntar",
        timestamp: "10:18",
        isOwn: false,
    },
    {
        id: 4,
        chatId: 1,
        sender: "Juan Pérez",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Mira esta foto que tomé ayer",
        img: "https://picsum.photos/400/300",
        timestamp: "10:20",
        isOwn: false,
    },
    {
        id: 5,
        chatId: 1,
        sender: "Tú",
        content: "¡Qué bonita! ¿Dónde es?",
        timestamp: "10:25",
        isOwn: true,
    },
    {
        id: 6,
        chatId: 1,
        sender: "Juan Pérez",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "En el parque cerca de mi casa",
        timestamp: "10:30",
        isOwn: false,
    },
    {
        id: 7,
        chatId: 1,
        sender: "Tú",
        content: "Aquí te envío una imagen del viaje",
        img: "https://picsum.photos/400/250",
        timestamp: "10:32",
        isOwn: true,
    },
];
import Modal from "@/ui/Modal";


const Chat = () => {
    const { chatOpen, setChatOpen } = useGlobalState();
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [messages, setMessages] = useState(mockMessages);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

    const handleSendMessage = (content) => {
        if (!selectedChatId) return;

        const newMessage = {
            id: messages.length + 1,
            chatId: selectedChatId,
            sender: 'Tú',
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };

        setMessages([...messages, newMessage]);
    };

    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
        setIsMobileMenuOpen(false);
    };
    return (
        <ChatModal isOpen={chatOpen} onClose={() => { setChatOpen(false) }} title="Chat">
            <div className='flex h-screen bg-fondo'>
                {/* Chat list sidebar - hidden on mobile by default */}
                <div
                    className={`${isMobileMenuOpen ? "block" : "hidden"
                        } md:block md:w-1/3 lg:w-1/4 h-full`}
                >
                    <ChatList
                        onSelectChat={handleSelectChat}
                        selectedChatId={selectedChatId}
                    />
                </div>

                {/* Chat messages area */}
                <div className="flex-1 flex flex-col h-full">
                    {selectedChat ? (
                        <>
                            <div className="flex items-center md:hidden">
                                <button
                                    className="p-3 text-gray-600"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <div className="flex-1">
                                    <ChatHeader chat={selectedChat} />
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <ChatHeader chat={selectedChat} />
                            </div>

                            <MessageList chatId={selectedChatId} />
                            <MessageInput onSendMessage={handleSendMessage} />
                        </>
                    ) : (
                        <div className="h-full flex flex-col">
                            <div className="md:hidden p-3 flex items-center">
                                <button
                                    className="text-gray-600"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <h1 className="ml-3 text-xl font-semibold text-texto">Chat App</h1>
                            </div>
                            <div className="flex-1 flex items-center justify-center bg-uno">
                                <div className="text-center p-6">
                                    <div className="text-dos text-5xl mb-4">
                                        <svg
                                            className="h-16 w-16 mx-auto"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold text-texto">Bienvenido a Chat App</h2>
                                    <p className="text-gray-600 mt-2">
                                        Selecciona un chat para comenzar a conversar
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ChatModal>
    )
}

export default Chat;