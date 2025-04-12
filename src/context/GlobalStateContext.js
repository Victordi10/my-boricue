'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [theme, setTheme] = useState('light');

    // 🔁 Sincronizar el userId con localStorage al cargar
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // 🧠 Guardar automáticamente en localStorage cuando cambia userId
    useEffect(() => {
        if (userId !== null) {
            localStorage.setItem('userId', userId);
        }
    }, [userId]);

    console.log(userId)

    return (
        <GlobalStateContext.Provider value={{ userId, setUserId, theme, setTheme }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState debe usarse dentro de GlobalStateProvider');
    }
    return context;
}
