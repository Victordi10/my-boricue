import React from 'react';
import Avatar from './Avatar';

const ChatHeader = ({ chat }) => {
    if (!chat) return null;

    return (
        <div className="flex items-center p-2 border-b border-divisiones/30 bg-gradient-to-r from-uno via-uno/95 to-uno backdrop-blur-md relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dos/5 to-transparent"></div>

            <div className="relative z-10 flex items-center flex-1">
                {/* Avatar with glow effect */}
                <div className="relative">
                    <div className="absolute inset-0 bg-dos/20 rounded-full blur-md animate-pulse"></div>
                    <div className="relative ring-2 ring-dos/20 ring-offset-2 ring-offset-uno rounded-full transition-all duration-300 hover:ring-dos/40">
                        <Avatar src={chat.avatar} alt={chat.name} />
                    </div>
                </div>

                {/* Chat info */}
                <div className="ml-4 flex-1 min-w-0">
                    <h2 className=" text-md text-texto truncate font-semibold leading-tight">
                        {chat.name}
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                        <p className="text-xs text-gray-500 font-medium">En línea</p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-2">

                    {/* More options button */}
                    <button className="group p-2.5 rounded-xl hover:bg-gray-100/80 active:bg-gray-200/80 transition-all duration-200 active:scale-95 hover:shadow-md">
                        <svg
                            className="h-5 w-5 text-gray-600 group-hover:text-dos transition-colors duration-200"
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
        </div>
    );
};

export default ChatHeader;