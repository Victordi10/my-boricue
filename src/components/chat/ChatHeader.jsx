
// /src/components/chat/ChatHeader.jsx
import React from 'react';
import Avatar from './Avatar';

const ChatHeader = ({ chat }) => {
    if (!chat) return null;

    return (
        <div className="flex items-center p-3 border-b border-divisiones bg-uno">
            <Avatar src={chat.avatar} alt={chat.name} />
            <div className="ml-3">
                <h2 className="font-semibold text-texto">{chat.name}</h2>
                <p className="text-xs text-gray-500">En línea</p>
            </div>
            <div className="ml-auto flex space-x-3">
                <button className="p-1 rounded-full hover:bg-gray-100">
                    <svg
                        className="h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100">
                    <svg
                        className="h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
