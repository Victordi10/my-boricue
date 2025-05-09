import { errorResponse, successResponse } from "@/utils/handler";
import { getProductsWithPagination, getTotalProductsCount } from "@/lib/models/productosModel";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "8");
        const search = url.searchParams.get("search") || null;
        const categoria = url.searchParams.get("categoria") || null;
        const material = url.searchParams.get("material") || null;

        // Validación de parámetros
        if (page < 1 || limit < 1 || limit > 50) {
            return errorResponse("Parámetros de paginación inválidos", 400);
        }

        const productos = await getProductsWithPagination(page, limit, search, categoria, material);
        const totalCount = await getTotalProductsCount();
        const totalPages = Math.ceil(totalCount / limit);

        console.log("Productos:", productos);

        return successResponse('productos',{
            productos,
            total: totalCount,
            page,
            limit,
            totalPages,
        });
    } catch (error) {
        console.error("❌ Error al cargar productos:", error);
        return errorResponse("Ocurrió un error al cargar los productos", 500);
    }
}
