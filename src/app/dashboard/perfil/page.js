'use client'

import React, { useEffect, useState } from 'react';
import api from '@/services/axiosInstance';
import { useParams, useRouter } from "next/navigation";
import {
    UserCircle,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    Edit,
    FileText,
    ArrowLeft,
    Calendar,
    Building
} from 'lucide-react';
import Loader from '@/components/Loader';
import { ErrorScreen, InlineMessage } from '@/components/ShowMensaje';
import EditProfileModal from './EditProfileModal';
import Image from 'next/image';
import { useGlobalState } from '@/context/GlobalStateContext';

export default function Perfil() {
    const { userId } = useGlobalState();
    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });

    console.log('perfil', userId)

    const getPerfil = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/dashboard/perfil/${userId}`);
            if (response.status === 200) {
                const data = response.data.data;
                setPerfil(data);
                console.log('perfil: ', data);
            }
        } catch (error) {
            setError(true);
            setMensaje(error.response?.data?.mensaje || 'Ocurrió un error al cargar el perfil');
            console.error("Error al obtener el perfil:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditarPerfil = () => {
        setIsModalOpen(true);
    };

    // Añade esta función para manejar la actualización del perfil
    const handleProfileUpdated = (updatedProfile) => {
        setPerfil(updatedProfile);
        setNotification({
            show: true,
            message: 'Perfil actualizado correctamente',
            type: 'success'
        });

        // Auto-cierre de la notificación
        setTimeout(() => {
            setNotification({ show: false, message: '', type: 'info' });
        }, 3000);
    };

    const handleGenerarReporte = async () => {
        if (!perfil) return;

        setNotification({
            show: true,
            message: 'Generando reporte de usuario...',
            type: 'info'
        });

        try {
            // Simulando descarga o generación de reporte
            // Aquí podrías llamar a tu API
            // const response = await api.get(`/api/reportes/usuario/${id}`);

            // Simulación de operación exitosa después de 1.5 segundos
            setTimeout(() => {
                setNotification({
                    show: true,
                    message: 'Reporte generado correctamente',
                    type: 'success'
                });

                // Auto-cierre de la notificación
                setTimeout(() => {
                    setNotification({ show: false, message: '', type: 'info' });
                }, 3000);
            }, 1500);

        } catch (error) {
            setNotification({
                show: true,
                message: 'Error al generar el reporte',
                type: 'error'
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        getPerfil();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-fondo">
                <Loader />
                <p className="mt-4 text-lg text-texto font-medium">Cargando información de perfil...</p>
            </div>
        );
    }

    if (error) {
        return (
            <ErrorScreen
                title="No se pudo cargar el perfil"
                message={mensaje || "Ha ocurrido un error al intentar cargar la información del perfil."}
                retryAction={getPerfil}
            />
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
            {notification.show && (
                <div className="fixed top-4 right-4 z-50 max-w-md">
                    <InlineMessage
                        mensaje={notification.message}
                        variant={notification.type}
                        timeout={5000}
                        dismissible={true}
                        onClose={() => setNotification({ show: false, message: '', type: 'info' })}
                    />
                </div>
            )}



            <div className="max-w-4xl mx-auto">
                {/* Botón de volver y título */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-gray-600 hover:text-dos transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        <span>Volver</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Encabezado con banner */}
                    <div className="relative bg-gradient-to-r from-dos to-divisiones h-48">
                        <div className=" w-full p-6 bg-gradient-to-t from-black/20 to-transparent">
                            <h1 className="text-3xl text-white font-bold">Perfil de {perfil?.rol}</h1>
                        </div>
                    </div>

                    {/* Contenido del perfil */}
                    {perfil ? (
                        <div className="p-4 relative">
                            {/* Avatar con posición absoluta para sobreponerse al banner */}
                            <div className="absolute -top-20 left-6 bg-white rounded-full p-1 shadow-lg">
                                {perfil?.urlImgPerfil ? (
                                    <Image
                                        src={perfil?.urlImgPerfil}
                                        width={100}
                                        height={100}
                                        alt={`foto ${perfil?.nombres}`}
                                        className='rounded-full'
                                    />
                                ) : (
                                    <div className="bg-uno rounded-full p-4">
                                        <UserCircle size={96} className="text-dos" />
                                    </div>
                                )}
                            </div>

                            {/* Botones de acción a la derecha */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6 mt-2">
                                <button
                                    onClick={handleEditarPerfil}
                                    className="flex items-center justify-center bg-dos hover:bg-opacity-90 text-white font-medium py-2 px-5 rounded-lg transition-colors"
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar Perfil
                                </button>

                                <button
                                    onClick={handleGenerarReporte}
                                    className="flex items-center justify-center bg-divisiones hover:bg-opacity-90 text-white font-medium py-2 px-5 rounded-lg transition-colors"
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Generar Reporte
                                </button>
                            </div>

                            {/* Información principal */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Información Personal
                                    </h2>

                                    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-uno transition-colors">
                                        <UserCircle className="text-dos mr-3 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">Nombre completo</p>
                                            <p className="font-medium">{perfil.nombres}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-uno transition-colors">
                                        <Mail className="text-dos mr-3 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">Correo electrónico</p>
                                            <p className="font-medium">{perfil.correo}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-uno transition-colors">
                                        <Phone className="text-dos mr-3 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">Teléfono</p>
                                            <p className="font-medium">{perfil.telefono}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-uno transition-colors">
                                        <Phone className="text-dos mr-3 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">Identificacion</p>
                                            <p className="font-medium">{perfil.identificacion}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Información Adicional
                                    </h2>

                                    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-uno transition-colors">
                                        <MapPin className="text-dos mr-3 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">Dirección</p>
                                            <p className="font-medium">{perfil.direccion}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-uno transition-colors">
                                        <ShieldCheck className="text-dos mr-3 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">Rol</p>
                                            <p className="font-medium capitalize">{perfil.rol}</p>
                                        </div>
                                    </div>

                                    {/* Puedes mostrar campos adicionales que existan en el objeto perfil */}
                                    {perfil.fechaRegistro && (
                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-uno transition-colors">
                                            <Calendar className="text-dos mr-3 flex-shrink-0" size={24} />
                                            <div>
                                                <p className="text-sm text-gray-500">Fecha de registro</p>
                                                <p className="font-medium">
                                                    {new Date(perfil.fechaRegistro).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-600">No se encontraron datos del perfil</p>
                                <button
                                    className="mt-4 bg-dos hover:bg-divisiones text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                    onClick={getPerfil}
                                >
                                    Intentar cargar de nuevo
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                perfil={perfil}
                usuarioId={userId}
                onProfileUpdated={handleProfileUpdated}
            />
        </div>
    );
}