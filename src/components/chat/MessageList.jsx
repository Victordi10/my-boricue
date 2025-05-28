// /src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ chatId }) => {
    const messagesEndRef = useRef(null);

    // Filtrar mensajes por chatId
    const messages = mockMessages.filter(message => message.chatId === chatId);

    // Hacer scroll automático hacia el último mensaje
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 p-4 overflow-y-auto bg-white">
            {messages.length > 0 ? (
                <>
                    {messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                </>
            ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                    No hay mensajes en esta conversación
                </div>
            )}
        </div>
    );
};

export default MessageList;