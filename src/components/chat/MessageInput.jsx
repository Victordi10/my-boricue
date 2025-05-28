// /src/components/chat/MessageInput.jsx
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="p-3 bg-uno border-t border-divisiones">
            <form onSubmit={handleSubmit} className="flex items-center">
                <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700"
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
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                    </svg>
                </button>

                <input
                    type="text"
                    placeholder="Escribe un mensaje aquí"
                    className="flex-1 mx-3 p-2 rounded-full bg-white text-texto focus:outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button
                    type="submit"
                    className="p-2 text-dos hover:text-green-700"
                    disabled={!message.trim()}
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default MessageInput;