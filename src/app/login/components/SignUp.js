"use client"

import { useState, useEffect } from "react"
import { User, MapPin, Phone, Mail, Lock, UserCircle, Building, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

const SignUpMultiStep = ({ setRenderizar }) => {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        id: "",
        names: "",
        dress: "",
        phon: "",
        mail: "",
        pass: "",
        confirmPass: "",
        rol: "Usuario",
    })

    // Estado para el paso actual
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const [stepComplete, setStepComplete] = useState({
        1: false,
        2: false,
        3: false
    })

    // Validar el paso actual
    useEffect(() => {
        validateStep(currentStep)
    }, [formData, currentStep])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const validateStep = (step) => {
        let stepErrors = {}
        let isValid = true

        switch (step) {
            case 1:
                // Validación para el paso 1: Información personal
                if (!formData.id) {
                    stepErrors.id = "La identificación es requerida"
                    isValid = false
                }
                if (!formData.names) {
                    stepErrors.names = "El nombre es requerido"
                    isValid = false
                }
                break
            case 2:
                // Validación para el paso 2: Información de contacto
                if (!formData.dress) {
                    stepErrors.dress = "La dirección es requerida"
                    isValid = false
                }
                if (!formData.phon) {
                    stepErrors.phon = "El teléfono es requerido"
                    isValid = false
                } else if (!/^\d{10}$/.test(formData.phon)) {
                    stepErrors.phon = "El teléfono debe tener 10 dígitos"
                    isValid = false
                }
                if (!formData.mail) {
                    stepErrors.mail = "El correo es requerido"
                    isValid = false
                } else if (!/\S+@\S+\.\S+/.test(formData.mail)) {
                    stepErrors.mail = "El correo no es válido"
                    isValid = false
                }
                break
            case 3:
                // Validación para el paso 3: Seguridad y rol
                if (!formData.pass) {
                    stepErrors.pass = "La contraseña es requerida"
                    isValid = false
                } else if (formData.pass.length < 6) {
                    stepErrors.pass = "La contraseña debe tener al menos 6 caracteres"
                    isValid = false
                }
                if (!formData.confirmPass) {
                    stepErrors.confirmPass = "Confirma tu contraseña"
                    isValid = false
                } else if (formData.pass !== formData.confirmPass) {
                    stepErrors.confirmPass = "Las contraseñas no coinciden"
                    isValid = false
                }
                break
            default:
                break
        }

        setErrors(stepErrors)
        setStepComplete(prev => ({
            ...prev,
            [step]: isValid
        }))
        
        return isValid
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateStep(currentStep)) {
            return
        }
        
        setIsSubmitting(true)

        try {
            // Preparar datos para enviar (eliminar confirmPass que no se envía al servidor)
            const dataToSubmit = { ...formData }
            delete dataToSubmit.confirmPass
            
            // Aquí iría la lógica real de envío al endpoint /register
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSubmit),
            })

            if (response.ok) {
                // Manejar respuesta exitosa
                console.log("Registro exitoso")
                // Opcional: redirigir al login
                setRenderizar("SignIn")
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

    // Renderizar el paso actual
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-5">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Información Personal</h3>
                        
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.id ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="Número de identificación"
                                />
                            </div>
                            {errors.id && <p className="mt-1 text-sm text-red-500">{errors.id}</p>}
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.names ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="Nombre completo"
                                />
                            </div>
                            {errors.names && <p className="mt-1 text-sm text-red-500">{errors.names}</p>}
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-5">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Información de Contacto</h3>
                        
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.dress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="Dirección completa"
                                />
                            </div>
                            {errors.dress && <p className="mt-1 text-sm text-red-500">{errors.dress}</p>}
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.phon ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="Número de teléfono"
                                />
                            </div>
                            {errors.phon && <p className="mt-1 text-sm text-red-500">{errors.phon}</p>}
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.mail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>
                            {errors.mail && <p className="mt-1 text-sm text-red-500">{errors.mail}</p>}
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-5">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Seguridad y Rol</h3>
                        
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
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.pass ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.pass && <p className="mt-1 text-sm text-red-500">{errors.pass}</p>}
                        </div>

                        {/* Confirmar Contraseña */}
                        <div>
                            <label htmlFor="confirmPass" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Contraseña
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPass"
                                    id="confirmPass"
                                    value={formData.confirmPass}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.confirmPass ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.confirmPass && <p className="mt-1 text-sm text-red-500">{errors.confirmPass}</p>}
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
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none appearance-none bg-none"
                                >
                                    <option value="Usuario">Usuario</option>
                                    <option value="Empresa">Empresa</option>
                                </select>
                            </div>
                        </div>
                    </div>
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
            <div className="px-8 pt-6">
                <div className="flex items-center justify-between mb-8">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex flex-col items-center">
                            <div 
                                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                                ${currentStep === step 
                                    ? 'border-dos bg-dos text-white' 
                                    : currentStep > step || stepComplete[step]
                                        ? 'border-dos bg-white text-dos' 
                                        : 'border-gray-300 bg-white text-gray-500'
                                }`}
                            >
                                {currentStep > step || stepComplete[step] ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : (
                                    <span>{step}</span>
                                )}
                            </div>
                            <span className={`text-xs mt-1 ${currentStep === step ? 'text-dos font-medium' : 'text-gray-500'}`}>
                                {step === 1 ? 'Personal' : step === 2 ? 'Contacto' : 'Seguridad'}
                            </span>
                        </div>
                    ))}
                    
                    {/* Líneas conectoras */}
                    <div className="absolute left-0 right-0 flex justify-center">
                        <div className="w-2/3 flex">
                            <div className={`h-0.5 flex-1 mt-5 ${currentStep > 1 || stepComplete[1] ? 'bg-dos' : 'bg-gray-300'}`}></div>
                            <div className={`h-0.5 flex-1 mt-5 ${currentStep > 2 || stepComplete[2] ? 'bg-dos' : 'bg-gray-300'}`}></div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="py-4 px-8 space-y-6">
                {renderStep()}

                <div className="flex justify-between pt-4">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Anterior
                        </button>
                    ) : (
                        <div></div> // Espacio vacío para mantener la alineación
                    )}

                    {currentStep < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className={`flex items-center px-4 py-2 rounded-lg text-white bg-dos/90 hover:bg-dos transition-colors ${!stepComplete[currentStep] ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!stepComplete[currentStep]}
                        >
                            Siguiente
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting || !stepComplete[currentStep]}
                            className={`flex items-center px-6 py-2 rounded-lg text-white bg-dos/90 hover:bg-dos transition-colors ${(isSubmitting || !stepComplete[currentStep]) ? 'opacity-50 cursor-not-allowed' : ''}`}
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

                <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
                    ¿Ya tienes una cuenta?{" "}
                    <button
                        type="button"
                        onClick={() => setRenderizar("SignIn")}
                        className="font-medium text-dos hover:text-dos/80 transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUpMultiStep
