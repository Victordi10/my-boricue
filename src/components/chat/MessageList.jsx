// /src/components/chat/MessageList.jsx
'use client'
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import Loader from '../Loader';
import api from '@/services/axiosInstance';

const MessageList = ({ userId, messages, setMessages, avatarContact, selectedReceiverId }) => {
    const messagesEndRef = useRef(null);
    const scrollRef = useRef(null);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        const cargarMensajesDelChat = async () => {
            setLoadingMessages(true);
            if (!selectedReceiverId) return;
            try {
                const res = await api.get(`/api/dashboard/chat/${userId}/${selectedReceiverId}/messages`);
                setMessages(res.data.data);
                console.log("Mensajes cargados:", res.data.data);
                setHasMore(res.data.data.length === 20); // Si hay menos de 20, no hay más
            } catch (err) {
                console.error("Error al cargar mensajes del chat:", err);
            } finally {
                setLoadingMessages(false);
            }
        };

        cargarMensajesDelChat();
    }, [selectedReceiverId]);


    const cargarMasMensajes = async () => {
        if (isFetchingMore || !hasMore || messages.length === 0) {
            setIsFetchingMore(false);
            console.log("No hay más mensajes para cargar o ya se está cargando.");
            return
        }
        console.log("ya se está cargando.");


        setIsFetchingMore(true);
        const lastId = messages[0]?.id;

        try {
            const res = await api.get(`/api/dashboard/chat/${userId}/${selectedReceiverId}/messages?lastMessageId=${lastId}`);
            const nuevosMensajes = res.data.data;

            if (nuevosMensajes.length > 0) {
                setMessages(prev => [...nuevosMensajes, ...prev]);
                setHasMore(nuevosMensajes.length === 20);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error al cargar más mensajes:", err);
        } finally {
            setIsFetchingMore(false);
        }
    };



    useEffect(() => {
        const handleScroll = () => {
            if (!scrollRef.current || loadingMessages || messages.length === 0) return;

            const top = scrollRef.current.scrollTop;
            if (top <= 5) {
                cargarMasMensajes();
            }
        };

        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }
        console.log("Cargando mensajes del chat para el usuario:", "con receptor:",);

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [messages, loadingMessages]);




    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-white">
            {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                    <Loader />
                </div>
            ) : (
                <>
                    {messages.length > 0 ? (
                        <>
                            {messages.map(message => (
                                <Message
                                    key={message.id || message.timestamp}
                                    message={message}
                                    userId={userId}
                                    avatarContact={avatarContact}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            No hay mensajes en esta conversación
                        </div>
                    )}
                </>
            )}
        </div>
    );

};

export default MessageList;