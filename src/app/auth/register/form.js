"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useGlobalState } from '@/context/GlobalStateContext'
import api from "@/services/axiosInstance"
import { FormInput, FormSection, ProgressIndicator } from './FormComponents'

const SignUpForm = () => {
    const { setUserId } = useGlobalState()
    const router = useRouter()
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
    const [mensaje, setMensaje] = useState('')
    const [isError, setIsError] = useState(false)

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
        setCurrentStep(current => Math.min(current + 1, totalSteps))
    }

    const prevStep = () => {
        setCurrentStep(current => Math.max(current - 1, 1))
    }

    useEffect(() => {
        const handleFormSubmit = () => {
            handleSubmit();
        };

        document.addEventListener('submitForm', handleFormSubmit);

        return () => {
            document.removeEventListener('submitForm', handleFormSubmit);
        };
    }, [formData]); // Re-add event listener if formData changes

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) {
            return
        }

        setIsSubmitting(true)
        setIsError(false)

        try {
            const response = await api.post('/api/auth/register', formData)
            const data = response.data

            if (data.success && data.data.token) {
                localStorage.setItem("token", data.data.token)
                setUserId(data.data.userId)
                router.replace(`/dashboard/home`)
                setMensaje("Registro exitoso")
            } else {
                setMensaje('Ocurrio un error inesperado')
                console.error("Error en el registro")
            }
        } catch (error) {
            console.error("Error:", error)
            setIsError(true)
            if (error.response) {
                console.error("Error en la respuesta del servidor:", error.response.data)
                setMensaje(error.response.data.message || "Ocurrió un error inesperado")
            } else if (error.request) {
                console.error("No hubo respuesta del servidor:", error.request)
                setMensaje("No se recibió respuesta del servidor. Intenta nuevamente.")
            } else {
                console.error("Error al configurar la solicitud:", error.message)
                setMensaje("Hubo un problema al realizar el registro.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-dos py-6 px-8">
                <h2 className="text-3xl font-bold text-white text-center">Crear Cuenta</h2>
            </div>

            {/* Indicador de progreso */}
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

            <div className="py-8 px-8">
                {/* Sección 1: Información Personal */}
                <FormSection
                    title="Información Personal"
                    currentStep={currentStep}
                    stepNumber={1}
                    onNext={nextStep}
                    onPrev={prevStep}
                    isLastStep={false}
                    validateStep={validateStep}
                >
                    <FormInput
                        label="Identificación"
                        name="iden"
                        type="number"
                        placeholder="Número de identificación"
                        value={formData.iden}
                        onChange={handleChange}
                        error={formErrors.iden}
                        icon="User"
                    />

                    <FormInput
                        label="Nombres"
                        name="names"
                        type="text"
                        placeholder="Nombre completo"
                        value={formData.names}
                        onChange={handleChange}
                        error={formErrors.names}
                        icon="UserCircle"
                    />

                    <FormInput
                        label="Tipo de cuenta"
                        name="rol"
                        type="select"
                        value={formData.rol}
                        onChange={handleChange}
                        icon="Building"
                    >
                        <option value="Usuario">Usuario</option>
                        <option value="Empresa">Empresa</option>
                    </FormInput>
                </FormSection>

                {/* Sección 2: Información de Contacto */}
                <FormSection
                    title="Información de Contacto"
                    currentStep={currentStep}
                    stepNumber={2}
                    onNext={nextStep}
                    onPrev={prevStep}
                    isLastStep={false}
                    validateStep={validateStep}
                >
                    <FormInput
                        label="Dirección"
                        name="dress"
                        type="text"
                        placeholder="Dirección completa"
                        value={formData.dress}
                        onChange={handleChange}
                        error={formErrors.dress}
                        icon="MapPin"
                    />

                    <FormInput
                        label="Teléfono"
                        name="phon"
                        type="number"
                        placeholder="Número de teléfono"
                        value={formData.phon}
                        onChange={handleChange}
                        error={formErrors.phon}
                        icon="Phone"
                    />
                </FormSection>

                {/* Sección 3: Credenciales de Acceso */}
                <FormSection
                    title="Credenciales de Acceso"
                    currentStep={currentStep}
                    stepNumber={3}
                    onNext={nextStep}
                    onPrev={prevStep}
                    isLastStep={true}
                    isSubmitting={isSubmitting}
                    validateStep={validateStep}
                >
                    <FormInput
                        label="Correo"
                        name="mail"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={formData.mail}
                        onChange={handleChange}
                        error={formErrors.mail}
                        icon="Mail"
                    />

                    <FormInput
                        label="Contraseña"
                        name="pass"
                        type="password"
                        placeholder="••••••••"
                        value={formData.pass}
                        onChange={handleChange}
                        error={formErrors.pass}
                        icon="Lock"
                    />
                </FormSection>

                {mensaje !== '' && (
                    <p className={`text-lg ${isError ? 'text-red-600' : 'text-gray-700'} mt-4`}>{mensaje}</p>
                )}

                <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/auth/login" className="text-dos font-medium hover:underline">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm