'use client';

import { useState, useRef, useCallback } from 'react';
import { InlineMessage } from '@/components/ShowMensaje';
import Modal from '@/ui/Modal';
import { ImageIcon, PlusCircle } from 'lucide-react';
import api from '@/services/axiosInstance';
import { useGlobalState } from '@/context/GlobalStateContext';

export default function CreatePostButton({
    label = 'Crear Publicación',
    variant = 'default', // "default" | "icon" | "floating"
    icon: Icon = PlusCircle,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const baseClass = "flex items-center justify-center gap-2 text-white font-medium py-2 px-4 rounded-md transition-opacity";
    const styles = {
        default: `${baseClass} bg-gradient-to-r from-dos to-divisiones hover:opacity-90`,
        icon: `${baseClass} bg-dos hover:bg-opacity-90  w-14 h-14`,
        floating: `${baseClass} bg-dos hover:bg-opacity-90 fixed bottom-6 right-6 shadow-lg p-3 rounded-full z-50`,
    };

    return (
        <>
            <button onClick={handleOpen} className={styles[variant]}>
                <Icon />
                {variant === 'default' && <span>{label}</span>}
            </button>

            <CreatePostModal isOpen={isModalOpen} onClose={handleClose} />
        </>
    );
}


function CreatePostModal({ isOpen, onClose }) {
    const { userId } = useGlobalState()
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        tipo: '',
        categoria: '',
        precio: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [alert, setAlert] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            tipo: '',
            categoria: '',
            precio: '',
        });
        setSelectedImage(null);
        setPreviewUrl(null);
        setAlert(null);
        setSubmitSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);

        // Form validation
        if (!userId) {
            setAlert({
                message: 'Tu sesión no está lista. Intenta en unos segundos.',
                variant: 'error'
            });
            return;
        }

        if (!selectedImage) {
            setAlert({
                message: 'Por favor, sube una imagen para tu producto',
                variant: 'error'
            });
            return;
        }

        if (!formData.nombre) {
            setAlert({
                message: 'Por favor, ingresa un nombre para tu publicación',
                variant: 'error'
            });
            return;
        }

        if (!formData.tipo) {
            setAlert({
                message: 'Por favor, selecciona un tipo de producto',
                variant: 'error'
            });
            return;
        }

        if (!formData.categoria) {
            setAlert({
                message: 'Por favor, selecciona una categoría para tu publicación',
                variant: 'error'
            });
            return;
        }

        if (formData.categoria === 'Venta' && !formData.precio) {
            setAlert({
                message: 'Por favor, ingresa un precio para tu producto de venta',
                variant: 'error'
            });
            return;
        }

        setIsSubmitting(true);

        try {

            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('imagen', selectedImage);
            submitData.append('nombre', formData.nombre);
            submitData.append('descripcion', formData.descripcion);
            submitData.append('tipo', formData.tipo);
            submitData.append('categoria', formData.categoria);
            submitData.append('precio', formData.precio);

            // Replace with your actual API endpoint
            const response = await api.post(`/api/dashboard/productos/${userId}`, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status == 200) {
                setSubmitSuccess(true);
                setAlert({
                    message: '¡Publicación creada exitosamente!',
                    variant: 'success'
                });
            } else {
                setAlert({
                    message: 'Error al crear la publicación. Inténtalo de nuevo.',
                    variant: 'error'
                });
            }
        } catch (error) {
            setAlert({
                message: 'Error de conexión. Inténtalo más tarde.',
                variant: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={submitSuccess ? "¡Publicación Creada!" : "Crear Nueva Publicación"}
        >
            <>
                {submitSuccess ? (
                    // Success message view
                    <div className="text-center py-4">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">¡Publicación creada con éxito!</h3>
                        <div className="mt-4 text-sm text-gray-500">
                            <p>Tu publicación ha sido creada correctamente y ya está disponible para que otros usuarios la vean.</p>
                        </div>
                        <div className="mt-6 flex justify-center space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    handleClose();
                                    window.location.href = '/dashboard';
                                }}
                                className="bg-divisiones text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                            >
                                Ver mis publicaciones
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    setSubmitSuccess(false);
                                }}
                                className="bg-dos text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                            >
                                Crear otra publicación
                            </button>
                        </div>
                    </div>
                ) : (
                    // Form view
                    <>
                        {alert && (
                            <div className="mb-4">
                                <InlineMessage
                                    mensaje={alert.message}
                                    variant={alert.variant}
                                    timeout={5000}
                                    onClose={() => setAlert(null)}
                                />
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Image Upload Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Sube una foto de tu producto
                                </label>
                                <div
                                    onClick={triggerFileInput}
                                    className="cursor-pointer border-2 border-dashed border-dos rounded-lg p-4 flex flex-col items-center justify-center bg-uno bg-opacity-30 hover:bg-opacity-50 transition-all"
                                >
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />

                                    {previewUrl ? (
                                        <div className="relative w-full">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="mx-auto max-h-40 rounded-md object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedImage(null);
                                                    setPreviewUrl(null);
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                            >
                                                <span className="sr-only">Eliminar imagen</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <ImageIcon className="h-10 w-10 text-dos mb-2" />
                                            <div className="text-center">
                                                <p className="text-sm text-gray-600">Haz clic para seleccionar una imagen</p>
                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG hasta 5MB</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Title Input */}
                            <div className="space-y-1">
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                    Nombra tu publicación
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dos"
                                    placeholder="Título atractivo para tu producto"
                                />
                            </div>

                            {/* Description Input */}
                            <div className="space-y-1">
                                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                                    Describe tu producto
                                </label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    rows="3"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dos"
                                    placeholder="Añade todos los detalles relevantes sobre tu producto..."
                                ></textarea>
                            </div>

                            {/* Type Selection */}
                            <div className="space-y-1">
                                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                                    Tipo de producto
                                </label>
                                <select
                                    id="tipo"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dos bg-white"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="Papel">Papel</option>
                                    <option value="Aluminio">Aluminio</option>
                                    <option value="Cuero">Cuero</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            {/* Category Selection */}
                            <div className="space-y-1">
                                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                                    Categoría de la publicación
                                </label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dos bg-white"
                                >
                                    <option value="">Seleccione una categoría</option>
                                    <option value="Venta">Venta</option>
                                    <option value="Intercambio">Intercambio</option>
                                    <option value="Donacion">Donación</option>
                                </select>
                            </div>

                            {/* Price Input - Only shown for "Venta" category */}
                            {formData.categoria === 'Venta' && (
                                <div className="space-y-1">
                                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                                        Precio del artículo
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <span className="text-gray-500">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            id="precio"
                                            name="precio"
                                            value={formData.precio}
                                            onChange={handleInputChange}
                                            className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dos"
                                            placeholder="100.000"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={!userId || isSubmitting}
                                    className={`w-full py-2 px-4 rounded-md text-white ${!userId || isSubmitting ? 'bg-gray-400' : 'bg-dos hover:bg-dos/80'}`}
                                >
                                    {isSubmitting ? 'Publicando...' : 'Publicar'}
                                </button>

                            </div>
                        </form>
                    </>
                )}
            </>
        </Modal>
    );
}