'use client';

import { useState, useRef, useEffect } from 'react';
import { InlineMessage } from '@/components/ShowMensaje';
import Modal from '@/ui/Modal';
import { ImageIcon, PencilIcon } from 'lucide-react';
import api from '@/services/axiosInstance';
import { useGlobalState } from '@/context/GlobalStateContext';

export default function EditPostButton({
    productId,
    productData,
    onSuccess,
    label = 'Editar',
    variant = 'default', // "default" | "icon" | "minimal"
    icon: Icon = PencilIcon,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const baseClass = "flex items-center justify-center gap-2 font-medium py-2 px-4 rounded-md transition-opacity";
    const styles = {
        default: `${baseClass} bg-gradient-to-r from-dos to-divisiones text-white hover:opacity-90`,
        icon: `${baseClass} bg-amber-500 hover:bg-amber-600 text-white w-10 h-10 p-2 rounded-full`,
        minimal: `${baseClass} text-amber-600 hover:bg-amber-50 border border-amber-300`,
    };

    const handleEditSuccess = () => {
        handleClose();
        if (onSuccess) onSuccess();
    };

    return (
            <button onClick={handleOpen} className={styles[variant]}>
                <Icon size={variant === 'icon' ? 18 : 16} />
                {variant !== 'icon' && <span>{label}</span>}
            </button>
    );
}

export function EditPostModal({ isOpen, onClose, productData, onSuccess }) {
    const { userId } = useGlobalState();
    const [formData, setFormData] = useState({
        idProducto:'',
        nombre: '',
        descripcion: '',
        tipo: '',
        categoria: '',
        precio: '',
        imagenActual: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [alert, setAlert] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const fileInputRef = useRef(null);

    // Load product data into the form when the modal opens or product changes
    useEffect(() => {
        if (productData && isOpen) {
            setFormData({
                nombre: productData.nombre || '',
                descripcion: productData.descripcion || '',
                tipo: productData.tipo || '',
                categoria: productData.categoria || '',
                precio: productData.precio || '',
                idProducto: productData.idProducto || '',
                imagenActual: productData.imagen || null
            });

            // If there's an existing image, set it as preview
            if (productData.imagen) {
                setPreviewUrl(productData.imagen);
            }
        }
    }, [productData, isOpen]);

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
        if (productData) {
            setFormData({
                nombre: productData.nombre || '',
                descripcion: productData.descripcion || '',
                tipo: productData.tipo || '',
                categoria: productData.categoria || '',
                precio: productData.precio || '',
                idProducto: productData.idProducto || '',
                imagenActual: productData.imagen || null
            });
            setPreviewUrl(productData.imagen || null);
        } else {
            setFormData({
                nombre: '',
                descripcion: '',
                tipo: '',
                categoria: '',
                precio: '',
                c: null
            });
            setPreviewUrl(null);
        }
        setSelectedImage(null);
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

            // Only append the image if a new one was selected
            if (selectedImage) {
                submitData.append('imagen', selectedImage);
            }

            submitData.append('idProducto', formData.idProducto);
            submitData.append('nombre', formData.nombre);
            submitData.append('descripcion', formData.descripcion);
            submitData.append('tipo', formData.tipo);
            submitData.append('categoria', formData.categoria);
            submitData.append('precio', formData.precio);
            submitData.append('imagenActual', formData.imagenActual);

            // Use PATCH for updates
            const response = await api.put(`/api/dashboard/productos/${userId}`, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setSubmitSuccess(true);
                setAlert({
                    message: '¡Publicación actualizada exitosamente!',
                    variant: 'success'
                });
                // Call the success callback if provided
                if (onSuccess) {
                    setTimeout(() => {
                        onSuccess();
                    }, 1500);
                }
            } else {
                setAlert({
                    message: 'Error al actualizar la publicación. Inténtalo de nuevo.',
                    variant: 'error'
                });
            }
        } catch (error) {
            console.error("Error updating product:", error);
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
            title={submitSuccess ? "¡Publicación Actualizada!" : "Editar Publicación"}
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
                        <h3 className="text-lg font-medium text-gray-900">¡Publicación actualizada con éxito!</h3>
                        <div className="mt-4 text-sm text-gray-500">
                            <p>Los cambios han sido guardados correctamente.</p>
                        </div>
                        <div className="mt-6 flex justify-center space-x-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="bg-divisiones text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                            >
                                Cerrar
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
                                    timeout={7000}
                                    onClose={() => setAlert(null)}
                                />
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Image Upload Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Imagen del producto
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
                                                    // If we're removing an uploaded image, don't reset the preview if it's the original product image
                                                    if (selectedImage) {
                                                        setPreviewUrl(productData.imagen || null);
                                                    } else {
                                                        // If we're removing the original image
                                                        setPreviewUrl(null);
                                                    }
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
                                                <p className="text-sm text-gray-600">Haz clic para cambiar la imagen</p>
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
                                    className={`px-4 py-2 rounded-md text-white ${!userId || isSubmitting ? 'bg-gray-400' : 'bg-dos hover:bg-dos/80'}`}
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </>
        </Modal>
    );
}