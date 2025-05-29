"use client";
import React, { useState, useEffect } from 'react';
import ChatList from '@/components/chat/ChatList';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { useGlobalState } from '@/context/GlobalStateContext';
import { ChatModal } from '@/ui/Modal';
import { io } from "socket.io-client";
import api from '@/services/axiosInstance';


const Chat = () => {

    const { chatOpen, setChatOpen, userId } = useGlobalState();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [socket, setSocket] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [message, setMessage] = useState('');
    const selectedChat = chats.find(chat => chat.id === selectedChatId);

    useEffect(() => {
        const cargarChats = async () => {
            try {
                const response = await api.get(`/api/dashboard/chat/${userId}`);
                const data = await response.data.data;
                setChats(data);
            } catch (error) {
                console.error("Error al obtener chats:", error);
            }
        };

        if (userId) {
            cargarChats();
        }
    }, [userId]);

    useEffect(() => {
        const socketIo = io("http://localhost:4000"); // conecta al server Socket.IO separado
        setSocket(socketIo);

        socketIo.on("receive-message", (msg) => {
            setChats((prev) => [...prev, msg]);
        });

        return () => {
            socketIo.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (socket && message.trim() !== "") {
            socket.emit("send-message", message);
            setChats((prev) => [...prev, message]);
            setMessage("");
        }
    };

    /*     const handleSendMessage = (content) => {
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
        }; */

    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
        setIsMobileMenuOpen(false);
    };
    return (
        <div className='flex h-screen bg-fondo'>
            {/* Chat list sidebar - hidden on mobile by default */}
            <div
                className={`${isMobileMenuOpen ? "block" : "hidden"
                    } md:block md:w-[40%] lg:w-1/3 h-full`}
            >
                <ChatList
                    onSelectChat={handleSelectChat}
                    selectedChatId={selectedChatId}
                    chats={chats}
                />
            </div>

            {/* Chat messages area */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto">
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
    )
}

export default Chat;