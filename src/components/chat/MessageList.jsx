// /src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import Message from './Message';
// /src/data/mockData.js
export const mockChats = [
    {
      id: 1,
      name: "Juan Pérez",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "¿Cómo estás hoy?",
      lastMessageTime: "10:30",
      unreadCount: 2,
    },
    {
      id: 2,
      name: "María García",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "¿Nos vemos mañana?",
      lastMessageTime: "09:15",
      unreadCount: 0,
    },
    {
      id: 3,
      name: "Carlos López",
      avatar: "https://i.pravatar.cc/150?img=8",
      lastMessage: "Revisa el documento que te envié",
      lastMessageTime: "Ayer",
      unreadCount: 0,
    },
    {
      id: 4,
      name: "Ana Martínez",
      avatar: "https://i.pravatar.cc/150?img=9",
      lastMessage: "Gracias por la ayuda",
      lastMessageTime: "Ayer",
      unreadCount: 0,
    },
    {
      id: 5,
      name: "Pedro Rodríguez",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "¿Listo para la reunión?",
      lastMessageTime: "Lunes",
      unreadCount: 0,
    },
  ];
  
  export const mockMessages = [
    {
      id: 1,
      chatId: 1,
      sender: "Juan Pérez",
      avatar: "https://i.pravatar.cc/150?img=1",
      content: "Hola, ¿cómo estás?",
      timestamp: "10:15",
      isOwn: false,
    },
    {
      id: 2,
      chatId: 1,
      sender: "Tú",
      content: "¡Bien! ¿Y tú?",
      timestamp: "10:16",
      isOwn: true,
    },
    {
      id: 3,
      chatId: 1,
      sender: "Juan Pérez",
      avatar: "https://i.pravatar.cc/150?img=1",
      content: "Todo muy bien, gracias por preguntar",
      timestamp: "10:18",
      isOwn: false,
    },
    {
      id: 4,
      chatId: 1,
      sender: "Juan Pérez",
      avatar: "https://i.pravatar.cc/150?img=1",
      content: "Mira esta foto que tomé ayer",
      img: "https://picsum.photos/400/300",
      timestamp: "10:20",
      isOwn: false,
    },
    {
      id: 5,
      chatId: 1,
      sender: "Tú",
      content: "¡Qué bonita! ¿Dónde es?",
      timestamp: "10:25",
      isOwn: true,
    },
    {
      id: 6,
      chatId: 1,
      sender: "Juan Pérez",
      avatar: "https://i.pravatar.cc/150?img=1",
      content: "En el parque cerca de mi casa",
      timestamp: "10:30",
      isOwn: false,
    },
    {
      id: 7,
      chatId: 1,
      sender: "Tú",
      content: "Aquí te envío una imagen del viaje",
      img: "https://picsum.photos/400/250",
      timestamp: "10:32",
      isOwn: true,
    },
  ];
  

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