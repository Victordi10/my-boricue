"use client"

import { useState } from "react"
import { User, MapPin, Phone, Mail, Lock, UserCircle, Building, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import api from "@/services/axiosInstance"

const SignUp = ({ setRenderizar }) => {
    const [formData, setFormData] = useState({
        iden: "",
        names: "",
        dress: "",
        phon: "",
        mail: "",
        pass: "",
        rol: "Usuario",
    })

    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formErrors, setFormErrors] = useState({})

    const totalSteps = 3

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Limpiar error del campo cuando el usuario escribe
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    const validateStep = (step) => {
        let errors = {}
        let isValid = true

        if (step === 1) {
            if (!formData.iden.trim()) {
                errors.iden = "Identificación es requerida"
                isValid = false
            }
            if (!formData.names.trim()) {
                errors.names = "Nombres son requeridos"
                isValid = false
            }
        } else if (step === 2) {
            if (!formData.dress.trim()) {
                errors.dress = "Dirección es requerida"
                isValid = false
            }
            if (!formData.phon.trim()) {
                errors.phon = "Teléfono es requerido"
                isValid = false
            }
        } else if (step === 3) {
            if (!formData.mail.trim()) {
                errors.mail = "Correo es requerido"
                isValid = false
            } else if (!/\S+@\S+\.\S+/.test(formData.mail)) {
                errors.mail = "Formato de correo inválido"
                isValid = false
            }
            if (!formData.pass.trim()) {
                errors.pass = "Contraseña es requerida"
                isValid = false
            } else if (formData.pass.length < 6) {
                errors.pass = "La contraseña debe tener al menos 6 caracteres"
                isValid = false
            }
        }

        setFormErrors(errors)
        return isValid
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(current => Math.min(current + 1, totalSteps))
        }
    }

    const prevStep = () => {
        setCurrentStep(current => Math.max(current - 1, 1))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateStep(currentStep)) {
            return
        }

        setIsSubmitting(true)

        try {
            // Aquí iría la lógica real de envío al endpoint /register
            const response = await api.post('/api/auth/register', formData)

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

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h3 className="text-xl font-medium text-gray-800 mb-4">Información Personal</h3>

                        {/* Identificación */}
                        <div className="mb-5">
                            <label htmlFor="iden" className="block text-sm font-medium text-gray-700 mb-1">
                                Identificación
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="iden"
                                    id="iden"
                                    value={formData.iden}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${formErrors.iden ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="Número de identificación"
                                />
                                {formErrors.iden && <p className="mt-1 text-sm text-red-600">{formErrors.iden}</p>}
                            </div>
                        </div>

                        {/* Nombres */}
                        <div className="mb-5">
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${formErrors.names ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="Nombre completo"
                                />
                                {formErrors.names && <p className="mt-1 text-sm text-red-600">{formErrors.names}</p>}
                            </div>
                        </div>

                        {/* Rol */}
                        <div className="mb-5">
                            <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo de cuenta
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
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none appearance-none bg-none"
                                >
                                    <option value="Usuario">Usuario</option>
                                    <option value="Empresa">Empresa</option>
                                </select>
                            </div>
                        </div>
                    </>
                )
            case 2:
                return (
                    <>
                        <h3 className="text-xl font-medium text-gray-800 mb-4">Información de Contacto</h3>

                        {/* Dirección */}
                        <div className="mb-5">
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${formErrors.dress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="Dirección completa"
                                />
                                {formErrors.dress && <p className="mt-1 text-sm text-red-600">{formErrors.dress}</p>}
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="mb-5">
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${formErrors.phon ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="Número de teléfono"
                                />
                                {formErrors.phon && <p className="mt-1 text-sm text-red-600">{formErrors.phon}</p>}
                            </div>
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <h3 className="text-xl font-medium text-gray-800 mb-4">Credenciales de Acceso</h3>

                        {/* Correo */}
                        <div className="mb-5">
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${formErrors.mail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="correo@ejemplo.com"
                                />
                                {formErrors.mail && <p className="mt-1 text-sm text-red-600">{formErrors.mail}</p>}
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="mb-5">
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${formErrors.pass ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="••••••••"
                                />
                                {formErrors.pass && <p className="mt-1 text-sm text-red-600">{formErrors.pass}</p>}
                            </div>
                        </div>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-dos py-6 px-8">
                <h2 className="text-3xl font-bold text-white text-center">Crear Cuenta</h2>
            </div>

            {/* Indicador de progreso */}
            <div className="bg-gray-50 px-8 py-4">
                <div className="flex items-center justify-center">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <div key={index} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${currentStep > index + 1
                                        ? 'bg-green-500 text-white'
                                        : currentStep === index + 1
                                            ? 'bg-dos text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {currentStep > index + 1 ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            {index < totalSteps - 1 && (
                                <div className={`w-10 h-1 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="py-8 px-8">
                {renderStepContent()}

                <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dos transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            Anterior
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {currentStep < totalSteps ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-dos/90 hover:bg-dos focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dos transition-colors"
                        >
                            Siguiente
                            <ChevronRight className="h-5 w-5 ml-1" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-48 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-dos/90 hover:bg-dos focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dos transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
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
                    )}
                </div>

                <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/auth/login" className="text-dos font-medium hover:underline">
                        Iniciar Sesión
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp