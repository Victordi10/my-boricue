"use client"

import { useState } from "react"
import { User, MapPin, Phone, Mail, Lock, UserCircle, Building } from "lucide-react"

const SignUp = ({ setRenderizar }) => {
    const [formData, setFormData] = useState({
        id: "",
        names: "",
        dress: "",
        phon: "",
        mail: "",
        pass: "",
        rol: "Usuario",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

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

        try {
            // Aquí iría la lógica real de envío al endpoint /register
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                // Manejar respuesta exitosa
                console.log("Registro exitoso")
            } else {
                // Manejar error
                console.error("Error en el registro")
            }
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-dos py-6 px-8">
                <h2 className="text-3xl font-bold text-white text-center">Crear Cuenta</h2>
            </div>

            <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
                <div className="space-y-5">
                    {/* Identificación */}
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                            Identificación
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="id"
                                id="id"
                                value={formData.id}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none"
                                placeholder="Número de identificación"
                                required
                            />
                        </div>
                    </div>

                    {/* Nombres */}
                    <div>
                        <label htmlFor="names" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombres
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserCircle className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="names"
                                id="names"
                                value={formData.names}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none"
                                placeholder="Nombre completo"
                                required
                            />
                        </div>
                    </div>

                    {/* Dirección */}
                    <div>
                        <label htmlFor="dress" className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="dress"
                                id="dress"
                                value={formData.dress}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                placeholder="Dirección completa"
                                required
                            />
                        </div>
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label htmlFor="phon" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="phon"
                                id="phon"
                                value={formData.phon}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                placeholder="Número de teléfono"
                                required
                            />
                        </div>
                    </div>

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

                    {/* Rol */}
                    <div>
                        <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
                            Rol
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                name="rol"
                                id="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none appearance-none bg-none"
                                required
                            >
                                <option value="Usuario">Usuario</option>
                                <option value="Empresa">Empresa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-dos/90 hover:bg-dos focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dos transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
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
                            "Crear Cuenta"
                        )}
                    </button>
                </div>

                <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
                    ¿Ya tienes una cuenta?{" "}
                    <button
                        type="button"
                        onClick={() => setRenderizar("SignIn")}
                        className="font-medium text-dos hover:text-dos transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp

