// /src/components/chat/Message.jsx
import React from 'react';
import Avatar from './Avatar';

const Message = ({ message }) => {
    const messageClasses = message.isOwn
        ? "bg-dos text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg ml-auto"
        : "bg-uno text-texto rounded-tl-lg rounded-tr-lg rounded-br-lg";

    const wrapperClasses = message.isOwn
        ? "flex flex-col items-end"
        : "flex flex-col items-start";

    return (
        <div className={`mb-4 max-w-[80%] ${wrapperClasses}`}>
            {!message.isOwn && (
                <div className="flex items-center mb-1">
                    <Avatar src={message.avatar} alt={message.sender} size="sm" />
                    <span className="ml-2 text-xs font-medium text-gray-600">{message.sender}</span>
                </div>
            )}

            <div className={`p-3 ${messageClasses}`}>
                <p className="break-words">{message.content}</p>

                {/* Si hay una imagen, la mostramos */}
                {message.img && (
                    <div className="mt-2 rounded-lg overflow-hidden">
                        <img
                            src={message.img}
                            alt="Imagen adjunta"
                            className="w-full h-auto max-h-60 object-cover"
                        />
                    </div>
                )}

                <div className={`text-xs mt-1 ${message.isOwn ? 'text-gray-200' : 'text-gray-500'} text-right`}>
                    {message.timestamp}
                </div>
            </div>
        </div>
    );
};

export default Message