import { NextResponse } from 'next/server';
import { getUserByEmail, verificarPassword } from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { errorResponse, successResponse } from '@/utils/handler';

// Ruta POST para login
export async function POST(req) {
    try {
        const { mail, pass } = await req.json();
        console.log(mail, pass )

        if (!mail || !pass) {
            return errorResponse('Email y contraseña son requeridos', 400);
        }

        const user = await getUserByEmail(mail);
        if (!user) {
            return errorResponse('Usuario y/o contraseña incorrectos', 401);
        }

        const isMatch = await verificarPassword(pass, user.contrasena);
        if (!isMatch) {
            return errorResponse('Usuario y/o contraseña incorrectos', 401);
        }

        const token = jwt.sign({ idUsuario: user.idUsuario }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA || '1h',
        });

        return successResponse('Login exitoso', { token, userId: user.idUsuario });
    } catch (error) {
        console.error('Error en loginUser:', error);
        return errorResponse('Ocurrió un error al intentar iniciar sesión', 500);
    }
}
