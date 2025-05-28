'use client';

import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title = '', tamaño = 'md', children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-dos to-divisiones p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body (scrollable) */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}




export function ChatModal({ isOpen, onClose, title = '', tamaño = 'md', children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full  h-screen overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-dos to-divisiones p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body (scrollable) */}
                <div className="p-2 overflow-y-auto w-full max-h-[90%]">
                    {children}
                </div>
            </div>
        </div>
    );
}
