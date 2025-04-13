"use client";

import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import api from "@/services/axiosInstance";
import Link from "next/link";
import ShowMensaje from "@/components/ShowMensaje";
import { useRouter } from "next/navigation";
import { useGlobalState } from '@/context/GlobalStateContext';
const SignIn = ({ }) => {
    const { setUserId } = useGlobalState();
    const router = useRouter();
    const [formData, setFormData] = useState({
        mail: "",
        pass: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await api.post("/api/auth/login", formData);
            const data = response.data;

            if (data.data.token) {
                localStorage.setItem("token", data.data.token); // Guardar el token en localStorage
                setUserId(data.data.userId)
                router.replace(`/dashboard/dashboard`); // Redirigir al dashboard
                //console.log('Inicio sesion', data.data.token)
            } else {
                setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error de conexión. Intenta nuevamente.");
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-dos py-6 px-8">
                <h2 className="text-3xl font-bold text-white text-center">Iniciar Sesión</h2>
            </div>

            <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
                <div className="space-y-5">
                    <div>
                        <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
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

                    <div>
                        <label htmlFor="pass" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
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

                <ShowMensaje
                    mensaje={errorMessage}
                    isError={true}  // Agregar esta línea para mostrar el mensaje de error en color rojo
                />

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-dos/90 hover:bg-dos focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Procesando..." : (
                            <>
                                <LogIn className="mr-2 h-5 w-5" />
                                Iniciar Sesión
                            </>
                        )}
                    </button>
                </div>

                <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
                    ¿No tienes una cuenta?{" "}
                    <Link
                        href="/auth/register"
                        className="font-medium text-dos hover:text-dos transition-colors"
                    >
                        Regístrate
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
