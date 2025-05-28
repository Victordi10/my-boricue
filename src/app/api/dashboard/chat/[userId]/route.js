import { authMiddleware } from "@/middleware/authMiddleware";
import { errorResponse, successResponse } from "@/utils/handler";
import { obtenerChats } from "@/lib/models/chatModel";

const getHandler = async (req, contextPromise) => {
    try {
        const context = await contextPromise;
        const { userId } = context.params;
        console.log("ID de usuario recibido:", userId);
        if (!userId) {
            return errorResponse("falta el id de usuario", 401);
        }

        const chats = await obtenerChats(userId);
        console.log("Chats obtenidos:", chats);
        if (!chats || chats.length === 0) {
            return errorResponse("No se encontraron chats para este usuario", 404);
        }

        return successResponse("Chats encontrados", chats);
    } catch (error) {
        console.error("Error en loginUser:", error);
        return errorResponse("Ocurrió un error al intentar obtener el usuario", 500);
    }
}

export const GET = authMiddleware(getHandler)

