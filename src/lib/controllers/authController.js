import { getUserByEmail, verificarPassword } from "../models/User";
import jwt from "jsonwebtoken";
import { mostrarError, successResponse, errorResponse } from "../../utils/handler";

// Controlador de login
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body; // Obtener datos del request
        if (!email || !password) return errorResponse("Email y contraseña son requeridos", 400)

        const user = await getUserByEmail(email);
        if (!user) return errorResponse("Usuario y/o contraseña incorrectos", 401);

        const isMatch = await verificarPassword(password, user.contrasena);
        if (!isMatch) return errorResponse("Usuario y/o contraseña incorrectos", 401);

        // Crear token JWT
        const token = jwt.sign({ idUsuario: user.idUsuario }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA || "1h",
        });

        return successResponse({ token, userId: user.idUsuario });
    } catch (error) {
        mostrarError("loginUser", error);
        return errorResponse("Ocurrió un error al intentar iniciar sesión", 500);
    }
}