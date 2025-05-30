
import { authMiddleware } from "@/middleware/authMiddleware";
import { errorResponse, successResponse } from "@/utils/handler";
import { obtenerMensajes } from "@/lib/models/chatModel";

const getHandler = async (req, contextPromise) => {
    try {
        const context = await contextPromise;
        const { userId, contactoId } = context.params;

        const { searchParams } = new URL(req.url);
        const ultimoMensajeId = searchParams.get("lastMessageId");
        const limit = parseInt(searchParams.get("limit")) || 20;

        if (!userId || !contactoId) {
            return errorResponse("🔐 Faltan parámetros obligatorios", 400);
        }

        const mensajes = await obtenerMensajes(userId, contactoId, ultimoMensajeId, limit);
        console.log("📂 Mensajes obtenidos:", mensajes);

        return successResponse("✅ Mensajes encontrados", mensajes);
    } catch (error) {
        console.error("🚨 Error en getHandler (GET /chat/[userId]):", error);
        return errorResponse("Ocurrió un error al intentar obtener los chats", 500);
    }
};

export const GET = authMiddleware(getHandler);
