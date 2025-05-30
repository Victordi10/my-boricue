'use client'
import React, { useState, useRef, useEffect } from 'react';

const MessageInput = ({ onSendMessage, productoImagen }) => {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [productoArchivo, setProductoArchivo] = useState(productoImagen || null);
    const textareaRef = useRef(null);

    //console.log(productoImagen, "Imagen del producto en MessageInput");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() || productoArchivo) {
            onSendMessage(message.trim(), productoArchivo);
            setMessage('');
            setProductoArchivo(null);
            setIsTyping(false);
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        setIsTyping(e.target.value.length > 0);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    };

    useEffect(() => {
        if (textareaRef.current) textareaRef.current.focus();
    }, []);

    return (
        <div className="relative p-3 bg-gradient-to-r from-uno/30 to-uno/20 border-t border-divisiones backdrop-blur-md shadow-inner">

            {/* Imagen de producto previa al input */}
            {productoArchivo && (
                <div className="mb-3 flex items-center space-x-3 bg-white p-2 rounded-xl shadow-md border border-gray-200">
                    <img
                        src={productoArchivo}
                        alt="Producto"
                        className="w-14 h-14 object-cover rounded-xl border border-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => window.open(productoArchivo, '_blank')}
                    />
                    <p className="text-sm text-gray-600 font-medium">Vas a enviar esta imagen</p>
                </div>
            )}

            {/* Input y botones */}
            <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                <textarea
                    ref={textareaRef}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-white shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dos/30 resize-none min-h-[48px] max-h-[120px] transition-all"
                    value={message}
                    onChange={handleInputChange}
                    rows={1}
                />

                <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`p-3 rounded-full transition-all duration-300 shadow-md ${message.trim()
                            ? 'bg-gradient-to-r from-dos to-green-600 text-white hover:scale-105 hover:shadow-xl active:scale-95'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    title={message.trim() ? 'Enviar mensaje' : 'Escribe un mensaje'}
                >
                    <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isTyping ? 'rotate-45' : ''}`}
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
