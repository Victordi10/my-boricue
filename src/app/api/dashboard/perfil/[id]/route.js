import { errorResponse, successResponse } from '@/utils/handler';
import { getUser, actualizarPerfil } from '@/lib/models/perfilModel';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid'; // npm install uuid
import { authMiddleware } from "@/middleware/authMiddleware";


// Ruta POST para login

const getHandler = async (req, context) => {
    try {
        const { params } = context

        const { id } = params;
        if (!id) {
            return errorResponse("falta el id", 401);
        }

        const perfil = await getUser(id);
        if (!perfil) {
            return errorResponse("No se encontró el usuario", 404);
        }

        return successResponse("Usuario encontrado", perfil);
    } catch (error) {
        console.error("Error en loginUser:", error);
        return errorResponse("Ocurrió un error al intentar obtener el usuario", 500);
    }
}

const putHandler = async (req, context) => {
    const { params } = context
    const formData = await req.formData();
    const id = params.id;

    if (!id) {
        errorResponse("Faltan parametros necesarios", 401)
    }

    const nombres = formData.get('nombres');
    const telefono = formData.get('telefono');
    const direccion = formData.get('direccion');
    const file = formData.get('profileImage');
    const urlImgActual = formData.get('urlImgActual')

    let imageUrl = null;

    if (file && typeof file === 'object' && file.name) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name); // .jpg, .png, etc.
        const fileName = `${uuid()}${ext}`;
        const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

        await writeFile(filePath, buffer);
        imageUrl = `/uploads/${fileName}`;
    }

    try {
        await actualizarPerfil(nombres, telefono, direccion, imageUrl, id);

        let enviarImg = imageUrl ? imageUrl : urlImgActual

        return successResponse('Perfil actualizado', {
            id,
            nombres,
            telefono,
            direccion,
            urlImgPerfil: enviarImg
        });

    } catch (error) {
        console.error(error);
        return errorResponse("Error actualizando perfil", 500);
    }
}

export const GET = authMiddleware(getHandler)
export const PUT = authMiddleware(putHandler);