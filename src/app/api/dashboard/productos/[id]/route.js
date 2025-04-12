import { errorResponse, successResponse } from "@/utils/handler";
import { getProductosUser } from "@/lib/models/productosModel";
import { authMiddleware } from "@/middleware/authMiddleware";


const getHandler = async (req, context) => {
    try {
        const userId = req.user.id; // 👈 token ya decodificado gracias al middleware

        if (!userId) {
            return errorResponse('No se pudo obtener el ID del usuario', 400);
        }

        const productos = await getProductosUser(userId);

        return successResponse('Productos cargados correctamente', productos);
    } catch (error) {
        console.error(error);
        return errorResponse("Error al cargar los productos", 500);
    }
};

export const GET = authMiddleware(getHandler); // 👈 ¡Así se aplica el middleware!

