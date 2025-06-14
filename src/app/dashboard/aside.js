"use client";

import React, { useState } from "react";
import {
    Home,
    User,
    ShoppingBag,
    MessageCircle,
    Settings,
    ChevronRight,
    LogOut,
    LayoutDashboard,
    Menu
} from "lucide-react";
import Image from "next/image";
import { useGlobalState } from '@/context/GlobalStateContext';
import Link from "next/link";
import { useRouter } from "next/navigation";

// Array con opciones de navegación para Boricue


// Componente Aside
export default function Aside() {
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { userId, setUserId, chatOpen, setChatOpen } = useGlobalState();

    const handleLogout = () => {
        router.push('/auth/login');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserId(null);
    };


    const menuItems = [
        {
            label: "home",
            path: "/dashboard/home",
            icon: <LayoutDashboard className="mr-3 h-5 w-5 text-dos" />
        },
        {
            label: "Chat",
            onClick: ()=> setChatOpen(true),
            icon: <MessageCircle className="mr-3 h-5 w-5 text-dos" />
        },
        {
            label: "Productos",
            path: "/dashboard/productos",
            icon: <ShoppingBag className="mr-3 h-5 w-5 text-dos" />
        },
        {
            label: "Perfil",
            path: "/dashboard/perfil",
            icon: <User className="mr-3 h-5 w-5 text-dos" />
        },
    ];

    return (
        <>
            {/* Menú para escritorio */}
            <aside className="hidden md:flex flex-col w-56 bg-fondo border-r border-gray-200 shadow-sm h-screen fixed left-0 top-0">
                {/* Encabezado */}
                <div className="p-4 border-b border-gray-200 bg-dos">
                    <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src={'/LogoBoricueCircular.png'}
                            width={60}
                            height={60}
                            alt={'logo boricue'}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Menú principal */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.path ? (
                                    <Link
                                        href={item.path}
                                        className="flex text-base font-semibold items-center px-4 py-3 text-texto hover:bg-uno hover:text-dos group transition-colors"
                                    >
                                        {item.icon}
                                        <span className="flex-1">{item.label}</span>
                                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-dos" />
                                    </Link>
                                ) : (
                                    <button
                                        onClick={item.onClick}
                                        className="flex text-base font-semibold items-center px-4 py-3 w-full text-left text-texto hover:bg-uno hover:text-dos group transition-colors"
                                    >
                                        {item.icon}
                                        <span className="flex-1">{item.label}</span>
                                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-dos" />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Separador */}
                <div className="mx-4 my-2 border-t border-divisiones opacity-30"></div>

                {/* Botón de cerrar sesión */}
                <div className="p-4">
                    <button
                        className="flex items-center w-full px-4 py-3 rounded-lg text-texto hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* Botón para abrir menú en móvil */}
            <div className="md:hidden bg-dos w-full flex justify-between fixed top-0 p-2 px-4 z-40">
                <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src={'/LogoBoricueCircular.png'}
                        width={60}
                        height={60}
                        alt={'logo boricue'}
                        className="object-contain"
                    />
                </div>
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-1 py-0 rounded-md bg-dos text-white hover:bg-opacity-90 focus:outline-none focus:ring-2  focus:ring-dos"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Menú móvil */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menú lateral */}
                    <div className="fixed inset-y-0 left-0 w-72 bg-fondo shadow-xl flex flex-col">
                        {/* Encabezado del menú */}
                        <div className="p-4 border-b border-gray-200 bg-dos flex items-center justify-between">
                            <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src={'/LogoBoricueCircular.png'}
                                    width={60}
                                    height={60}
                                    alt={'logo boricue'}
                                    className="object-contain"
                                />
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-white hover:text-gray-200 p-1"
                            >
                                <span className="sr-only">Cerrar</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Elementos del menú */}
                        <nav className="flex-1 overflow-y-auto py-4">
                            <ul>
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        {item.path ? (
                                            <Link
                                                href={item.path}
                                                className="flex font-semibold text-base items-center px-4 py-3 text-texto hover:bg-uno hover:text-dos transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.icon}
                                                <span className="flex-1">{item.label}</span>
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    item.onClick();
                                                    setMobileMenuOpen(false);
                                                }}
                                                className="flex font-semibold text-base items-center px-4 py-3 w-full text-left text-texto hover:bg-uno hover:text-dos transition-colors"
                                            >
                                                {item.icon}
                                                <span className="flex-1">{item.label}</span>
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Separador */}
                        <div className="mx-4 my-2 border-t border-divisiones opacity-30"></div>

                        {/* Botón de cerrar sesión */}
                        <div className="p-4">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 rounded-lg text-texto hover:bg-red-50 hover:text-red-600 transition-colors">
                                <LogOut className="mr-3 h-5 w-5" />
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}