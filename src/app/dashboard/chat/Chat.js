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
    const { chatOpen, setChatOpen, userId, chatData, setChatData } = useGlobalState();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [socket, setSocket] = useState(null);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedReceiverId, setSelectedReceiverId] = useState(chatData?.idContacto || null);
    const selectedChat = chats.find(chat => chat.idContacto === selectedReceiverId) || chatData;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (chatData) {
            setSelectedReceiverId(chatData.idContacto);
        }
    }, [chatData]);

    useEffect(() => {
        const cargarChats = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/dashboard/chat/${userId}`);
                const data = await response.data.data;
                setChats(data);
            } catch (error) {
                console.error("Error al obtener chats:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            cargarChats();
        }
    }, [userId]);




    useEffect(() => {
        const socketIo = io("http://localhost:4000");

        socketIo.on("connect", () => {
            //console.log("🟢 Conectado a Socket.IO:", socketIo.id);
        });

        socketIo.on("receive-message", (msg) => {
            //console.log("📥 Mensaje recibido en cliente:", msg);
            setMessages((prev) => [...prev, msg]);
        });

        socketIo.on("disconnect", () => {
            console.log("🔴 Desconectado de Socket.IO");
        });

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);



    const sendMessage = (text, url_archivo) => {
        if (!socket || !text.trim()) return;

        console.log("Socket conectado:", socket.connected);

        const receiverId =
            selectedChat.idEmisor === userId
                ? selectedChat.idContacto
                : selectedChat.idEmisor;

        const message = {
            idEmisor: userId,
            idReceptor: receiverId,
            mensaje: text,
            url_archivo: url_archivo || null,
            fecha: new Date().toISOString(),
        };

        socket.emit("send-message", message);
        setMessages((prev) => [...prev, message]);

        setChats((prevChats) => {
            const receiverIdInt = parseInt(receiverId);

            const chatYaExiste = prevChats.some(
                (chat) => parseInt(chat.idContacto) === receiverIdInt
            );

            if (chatYaExiste) {
                // No hacer nada si ya está el contacto en la lista
                return prevChats;
            }

            /* const nuevoChat = {
                idContacto: receiverId,
                nombreContacto: selectedChat.nombreContacto,
                avatar: selectedChat.avatar,
                lastMessage: message.mensaje,
                lastFile: message.url_archivo,
                lastMessageTime: message.fecha,
            };

            return [nuevoChat, ...prevChats]; */
            return
        });
    };



    const handleSelectChat = (chatId) => {
        setSelectedReceiverId(chatId);
        setIsMobileMenuOpen(false);
    };

    const handleCloseChat = () => {
        setChatOpen(false);
        setSelectedReceiverId(null);
        setChatData(null);
    }

    return (
        <ChatModal isOpen={chatOpen} onClose={handleCloseChat}>
            <div className='flex h-full bg-fondo relative overflow-hidden'>
                {/* Sidebar backdrop for mobile */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Chat list sidebar */}
                <div
                    className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0 fixed md:relative z-50 md:z-auto w-full md:w-[40%] lg:w-1/3 h-full transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none`}
                >
                    <ChatList
                        onSelectChat={handleSelectChat}
                        selectedReceiverId={selectedReceiverId}
                        chats={chats || []}
                        loading={loading}
                    />
                </div>

                {/* Chat messages area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden backdrop-blur-sm">
                    {selectedChat ? (
                        <>
                            {/* Mobile header with menu toggle */}
                            <div className="flex items-center md:hidden bg-uno/95 backdrop-blur-md border-b border-divisiones/50">
                                <button
                                    className="p-4 text-gray-600 hover:text-texto hover:bg-gray-100/80 rounded-lg transition-all duration-200 active:scale-95"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <div className="flex-1 pr-4">
                                    <ChatHeader chat={selectedChat} />
                                </div>
                            </div>

                            {/* Desktop header */}
                            <div className="hidden md:block">
                                <ChatHeader chat={selectedChat} />
                            </div>

                            <MessageList userId={userId} selectedReceiverId={selectedReceiverId} messages={messages || []} setMessages={setMessages} avatarContact={selectedChat.avatar} />

                            <MessageInput onSendMessage={sendMessage} productoImagen={selectedChat?.url_archivo} />
                        </>
                    ) : (
                        <div className="h-full flex flex-col">
                            {/* Mobile header when no chat selected */}
                            <div className="md:hidden p-4 flex items-center bg-uno/95 backdrop-blur-md border-b border-divisiones/50">
                                <button
                                    className="text-gray-600 hover:text-texto hover:bg-gray-100/80 p-2 rounded-lg transition-all duration-200 active:scale-95"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <h1 className="ml-3 text-xl font-bold text-texto bg-gradient-to-r from-texto to-dos bg-clip-text">
                                    Chat App
                                </h1>
                            </div>

                            {/* Welcome screen */}
                            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-uno via-uno to-fondo relative overflow-hidden">
                                {/* Decorative background elements */}
                                <div className="absolute top-10 left-10 w-32 h-32 bg-dos/10 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute bottom-20 right-20 w-40 h-40 bg-dos/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

                                <div className="text-center p-8 relative z-10">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-dos/20 rounded-full blur-xl animate-pulse"></div>
                                        <div className="relative bg-gradient-to-br from-dos/20 to-dos/10 p-6 rounded-full backdrop-blur-sm border border-dos/20">
                                            <svg
                                                className="h-16 w-16 mx-auto text-dos drop-shadow-lg"
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
                                    </div>

                                    <h2 className="text-2xl font-bold text-texto mb-3 bg-gradient-to-r from-texto to-dos bg-clip-text">
                                        Bienvenido a Chat App
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                                        Selecciona un chat para comenzar una conversación increíble
                                    </p>

                                    {/* Animated hint */}
                                    <div className="mt-8 md:hidden">
                                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                            <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Toca el menú para ver tus chats</span>
                                        </div>
                                    </div>
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