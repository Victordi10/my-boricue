// /src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ userId, receiverId, messages }) => {
    const messagesEndRef = useRef(null);

    const filteredMessages = messages.filter(
        message =>
            (message.idEmisor === userId && message.idReceptor === receiverId) ||
            (message.idEmisor === receiverId && message.idReceptor === userId)
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [filteredMessages]);

    return (
        <div className="flex-1 p-4 overflow-y-auto bg-white">
            {filteredMessages.length > 0 ? (
                <>
                    {filteredMessages.map(message => (
                        <Message
                            key={message.id || message.timestamp}
                            message={message}
                            userId={userId}
                        />
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