import Joi from 'joi';
import { NextResponse } from "next/server";

//muestro en la consola donde estuvo el error
export const mostrarError = (donde, err) => {
    console.error(`Ocurrió un error en ${donde}: ${err.message}`);
};

export function errorResponse(message, statusCode = 500) {
    return NextResponse.json({ success: false, message }, { status: statusCode });
}

export function successResponse(message = "Operación exitosa", data = {}) {
    return NextResponse.json({ success: true, message, data }, { status: 200 });
}

//funcion para validar datos

export const validarUsername = () => {
    return Joi.string()
        .pattern(/^[a-zA-Z0-9_]+$/) // Solo letras, números y guiones bajos
        .invalid(' ') // No puede ser solo un espacio
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'El nombre de usuario debe ser un texto',
            'string.invalid': 'El nombre de usuario debe ser un texto',
            'string.pattern.base': 'Solo puede contener letras, números y guiones bajos. No se permiten espacios.',
            'string.min': 'Debe tener al menos 3 caracteres',
            'string.max': 'No puede tener más de 30 caracteres',
            'any.required': 'El nombre de usuario es obligatorio',
        });
};


export const validarCorreo = () => {
    return Joi.string().email().required().messages({
        'string.base': 'El correo debe ser un texto',
        'string.email': 'El correo debe tener un formato válido (ejemplo@dominio.com)',
        'any.required': 'El correo es obligatorio',
    });
};

// Función para validar la contraseña
export const validarContraseña = () => {
    return Joi.string().min(6).required().messages({
        'string.base': 'La contraseña debe ser un texto',
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'any.required': 'La contraseña es obligatoria',
    });
};

// Función para formatear números con puntos
export function formatNumberWithDots(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// Función para quitar puntos o comas de un número
export function removeDotsOrCommas(number) {
    return number.toString().replace(/[.,]/g, "");
}

export const obtenerPublicId = (url) => {
    return url.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
};

export const normalizarFecha = (fecha) => {
    const partes = fecha.split("/");
    const dia = partes[0].padStart(2, "0");
    const mes = partes[1].padStart(2, "0");
    const año = partes[2];
    return `${año}-${mes}-${dia}`; // Formato YYYY-MM-DD
};
