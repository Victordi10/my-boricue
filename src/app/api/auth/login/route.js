import { loginUser } from "@/lib/controllers/authController";
import { errorResponse, successResponse } from "@/utils/handler";

export async function POST(req) {
    try {
        const { mail, pass } = await req.json();

        if (!mail || !pass) {
            return errorResponse("Ingrese usuario y contraseña", 400);
        }

        const { token, userId, error } = await loginUser(mail, pass);

        if (error) {
            return errorResponse(error, 401);
        }

        const response = successResponse("Inicio de sesión exitoso", { userId });

        response.cookies.set("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
        });

        return response;
    } catch (error) {
        console.error("Error en la API de login:", error);
        return errorResponse("Error interno del servidor", 500);
    }
}