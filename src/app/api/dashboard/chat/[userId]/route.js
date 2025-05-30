import { authMiddleware } from "@/middleware/authMiddleware";
import { errorResponse, successResponse } from "@/utils/handler";
import { obtenerChats } from "@/lib/models/chatModel";

const getHandler = async (req, contextPromise) => {
    try {
        const context = await contextPromise;
        const { userId } = context.params;

        if (!userId) {
            return errorResponse("🔐 Falta el ID del usuario", 400);
        }

        const chats = await obtenerChats(userId);
        console.log("📂 Chats obtenidos:", chats);

        return successResponse("✅ Chats encontrados", chats);
    } catch (error) {
        console.error("🚨 Error en getHandler (GET /chat/[userId]):", error);
        return errorResponse("Ocurrió un error al intentar obtener los chats", 500);
    }
}

export const GET = authMiddleware(getHandler)

