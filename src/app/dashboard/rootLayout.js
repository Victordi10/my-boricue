
"use client";

import React, { useState } from "react";
import Aside from './aside'


export default function RootLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Aside />

            {/* Contenido principal con margen para el sidebar */}
            <main className="flex flex-col w-full mt-16 md:mt-0 md:ml-64 p-4 ">
                {children}
            </main>
        </div>
    );
}