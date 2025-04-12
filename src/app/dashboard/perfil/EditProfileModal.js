'use client'

import React, { useState, useEffect } from 'react';
import { X, Upload, Camera, Loader2 } from 'lucide-react';
import api from '@/services/axiosInstance';

export default function EditProfileModal({ isOpen, onClose, perfil, usuarioId, onProfileUpdated }) {
    const [formData, setFormData] = useState({
        nombres: '',
        telefono: '',
        direccion: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (perfil && isOpen) {
            setFormData({
                nombres: perfil.nombres || '',
                telefono: perfil.telefono || '',
                direccion: perfil.direccion || '',
                urlImgActual: perfil.urlImgPerfil
            });
            setImagePreview(perfil.urlImgPerfil)
        }
    }, [perfil, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formPayload = new FormData();

            // Añadir datos del formulario
            Object.keys(formData).forEach(key => {
                formPayload.append(key, formData[key]);
            });

            // Añadir imagen si existe
            if (file) {
                formPayload.append('profileImage', file);
            }

            // Realizar la petición
            const response = await api.put(`/api/dashboard/perfil/${usuarioId}`, formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                // Notificar al componente padre que el perfil se actualizó
                if (onProfileUpdated) onProfileUpdated(response.data.data);
                onClose();
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            setError(error.response?.data?.mensaje || 'Ocurrió un error al actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-dos to-divisiones p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Editar Perfil</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body with scrollable content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Image upload section */}
                        <div className="mb-6 flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="h-32 w-32 rounded-full bg-uno flex items-center justify-center overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <Camera size={64} className="text-dos" />
                                    )}
                                </div>
                                <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-dos hover:bg-opacity-90 text-white p-2 rounded-full cursor-pointer">
                                    <Upload size={20} />
                                </label>
                                <input
                                    type="file"
                                    id="profileImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <p className="text-sm text-gray-500">Haz clic en el icono para cambiar tu foto de perfil</p>
                        </div>

                        {/* Form fields in 2 columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Column 1 */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        id="nombres"
                                        name="nombres"
                                        value={formData.nombres}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dos focus:border-dos"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dos focus:border-dos"
                                    />
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        id="direccion"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dos focus:border-dos"
                                    />
                                </div>

                                {/* <div>
                                    <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
                                        Rol
                                    </label>
                                    <select
                                        id="rol"
                                        name="rol"
                                        value={formData.rol}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dos focus:border-dos"
                                    >
                                        <option value="">Seleccionar rol</option>
                                        <option value="administrador">Administrador</option>
                                        <option value="usuario">Usuario</option>
                                        <option value="editor">Editor</option>
                                    </select>
                                </div> */}

                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="py-2 px-5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="py-2 px-5 bg-dos hover:bg-opacity-90 text-white rounded-lg flex items-center transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="mr-2 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    'Guardar cambios'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}