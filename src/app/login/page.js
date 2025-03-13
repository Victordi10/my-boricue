'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, LogIn } from 'lucide-react'

import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'

const Login = () => {
    const [renderizar, setRenderizar] = useState('SignIn')
    const [isAnimating, setIsAnimating] = useState(false)

    const handleToggle = (view) => {
        if (renderizar !== view && !isAnimating) {
            setIsAnimating(true)
            setRenderizar(view)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false)
        }, 500) // Duración de la animación

        return () => clearTimeout(timer)
    }, [renderizar])

    return (
        <div className="min-h-screen w-full bg-[url('/bosque.jpg')] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">

            {/* Selector de formulario */}
            <div className="bg-white rounded-full shadow-md mb-8 p-1 flex items-center">
                <button
                    onClick={() => handleToggle('SignIn')}
                    className={`relative flex items-center px-6 py-3 rounded-full transition-all duration-300 ${renderizar === 'SignIn'
                            ? 'bg-dos text-white'
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <LogIn className="w-5 h-5 mr-2" />
                    <span className="font-medium">Iniciar Sesión</span>
                    {renderizar === 'SignIn' && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-dos -z-10"
                            layoutId="activeTab"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                </button>

                <button
                    onClick={() => handleToggle('SignUp')}
                    className={`relative flex items-center px-6 py-3 rounded-full transition-all duration-300 ${renderizar === 'SignUp'
                            ? 'bg-dos text-white'
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <UserPlus className="w-5 h-5 mr-2" />
                    <span className="font-medium">Registrarse</span>
                    {renderizar === 'SignUp' && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-dos -z-10"
                            layoutId="activeTab"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                </button>
            </div>

            {/* Contenedor de formularios con animación */}
            <div className="w-full max-w-md relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={renderizar}
                        initial={{ opacity: 0, x: renderizar === 'SignIn' ? -300 : 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: renderizar === 'SignIn' ? 300 : -300 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="w-full"
                    >
                        {renderizar === 'SignIn' ? (
                            <SignIn setRenderizar={setRenderizar} />
                        ) : (
                            <SignUp setRenderizar={setRenderizar} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 bg-dos opacity-10 rounded-full w-96 h-96 -mt-20 -mr-20"></div>
                <div className="absolute bottom-0 left-0 bg-dos opacity-10 rounded-full w-96 h-96 -mb-20 -ml-20"></div>
            </div>
        </div>
    )
}

export default Login
