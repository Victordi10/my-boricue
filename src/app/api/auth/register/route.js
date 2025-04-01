import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { registrarUser } from '@/lib/models/User';
import { errorResponse, successResponse } from '@/utils/handler';

export async function POST(req) {
    try {
        const { mail, pass, names, dress, phon, rol, iden } = await req.json();

        if (!mail || !pass || !names || !iden || !dress || !rol) {
            return errorResponse('Faltan parámetros', 400);
        }

        // Hashear la contraseña
        const passHash = await bcryptjs.hash(pass, 8);
        const result = await registrarUser(mail, passHash, names, dress, phon, rol, iden);

        if (result.error) {
            return errorResponse(result.error, 400);
        }

        // Crear el token con el userId
        const token = jwt.sign({ idUsuario: result.userId }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA || '1h',
        });

        return successResponse('Usuario registrado exitosamente', { token, userId: result.userId });
    } catch (error) {
        console.error('Error en registrarUsuario:', error);
        return errorResponse('Ocurrió un error al registrar el usuario', 500);
    }
}
