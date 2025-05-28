
"use client";

import React, { useState } from "react";
import Aside from './aside'
import Chat from "./chat/Chat";


export default function RootLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-fondo w-full">
            <Aside />

            {/* Contenido principal con margen para el sidebar */}
            <main className="flex flex-col w-full mt-16 md:mt-0 md:ml-56 p-4 ">
                {children}
            </main>
            <Chat />
        </div>
    );
}