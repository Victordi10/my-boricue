'use client'
// /src/components/chat/MessageInput.jsx
import React, { useState, useRef, useEffect } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
            setIsTyping(false);
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };


    const handleInputChange = (e) => {
        setMessage(e.target.value);
        setIsTyping(e.target.value.length > 0);

        // Auto-resize textarea
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }
    };

    useEffect(() => {
        // Focus the input when component mounts
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    return (
        <div className="p-2 bg-gradient-to-r from-uno/30 to-uno/20 border-t border-divisiones backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                {/* Botón de adjuntar archivo */}
                {/*  <button
                    type="button"
                    className="flex-shrink-0 p-3 rounded-full bg-white shadow-md text-gray-500 hover:text-dos hover:bg-gray-50 transition-all duration-200 hover:shadow-lg group"
                    title="Adjuntar archivo"
                >
                    <svg
                        className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                    </svg>
                </button> */}

                {/* Input de mensaje mejorado */}
                <textarea
                    ref={textareaRef}
                    placeholder="Escribe tu mensaje..."
                    className="w-full px-4 py-3 pr-12 rounded-2xl bg-white shadow-md text-texto placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dos/30 focus:shadow-lg transition-all duration-300 resize-none overflow-hidden min-h-[48px] max-h-[120px]"
                    value={message}
                    onChange={handleInputChange}
                    rows={1}
                />


                {/* Botón de enviar mejorado */}
                <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`flex-shrink-0 p-3 rounded-full shadow-lg transition-all duration-300 transform ${message.trim()
                        ? 'bg-gradient-to-r from-dos to-green-600 text-white hover:scale-105 hover:shadow-xl hover:from-green-600 hover:to-dos active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    title={message.trim() ? 'Enviar mensaje' : 'Escribe un mensaje'}
                >
                    <svg
                        className={`h-5 w-5 transition-transform duration-200 ${isTyping ? 'rotate-45' : ''
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default MessageInput;