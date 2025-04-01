'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, LogIn } from 'lucide-react'

import SignUp from './SignUp.js'

const Register = () => {
    const [error, setError] = useState('')


    return (
        <div className="min-h-screen w-full bg-[url('/bosque.jpg')] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">

            {/* Contenedor de formularios con animación */}
            <div className="w-full max-w-md relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        className="w-full"
                    >
                        <SignUp setError={setError}/>
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

export default Register
