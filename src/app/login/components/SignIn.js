"use client"

import { useState } from "react"
import { Mail, Lock, LogIn } from "lucide-react"

const SignIn = ({ setRenderizar }) => {
    const [formData, setFormData] = useState({
        mail: "",
        pass: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrorMessage("")

        try {
            // Aquí iría la lógica real de envío al endpoint /login
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                // Redireccionar o manejar inicio de sesión exitoso
                window.location.href = "/dashboard"
            } else {
                // Manejar error de inicio de sesión
                const data = await response.json()
                setErrorMessage(data.message || "Error al iniciar sesión. Verifica tus credenciales.")
            }
        } catch (error) {
            setErrorMessage("Error de conexión. Intenta nuevamente.")
            console.error("Error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-dos py-6 px-8">
                <h2 className="text-3xl font-bold text-white text-center">Iniciar Sesión</h2>
            </div>

            <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
                <div className="space-y-5">
                    {/* Correo */}
                    <div>
                        <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="mail"
                                id="mail"
                                value={formData.mail}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label htmlFor="pass" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="pass"
                                id="pass"
                                value={formData.pass}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Mensaje de error */}
                {errorMessage && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-dos/90 hover:bg-dos focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Procesando...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <LogIn className="mr-2 h-5 w-5" />
                                Iniciar Sesión
                            </span>
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-dos/90 focus:ring-dos border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Recordarme
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-dos hover:text-dos transition-colors">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
                    ¿No tienes una cuenta?{" "}
                    <button
                        type="button"
                        onClick={() => setRenderizar("SignUp")}
                        className="font-medium text-dos hover:text-dos transition-colors"
                    >
                        Regístrate
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignIn

