import { getUserByEmail, verificarPassword } from "../models/User";
import jwt from "jsonwebtoken";
import { mostrarError, successResponse, errorResponse } from "../../utils/handler";

export async function loginUser(email, password) {
    try {
        const user = await getUserByEmail(email);
        if (!user) return { error: "Usuario y/o contraseña incorrectos" };

        const isMatch = await verificarPassword(password, user.contrasena);
        if (!isMatch) return { error: "Usuario y/o contraseña incorrectos" };

        // Crear token JWT
        const token = jwt.sign({ idUsuario: user.idUsuario }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA,
        });

        return { token, userId: user.idUsuario };
    } catch (error) {
        mostrarError("loginUser", error);
        return { error: "Ocurrió un error al intentar iniciar sesión" };
    }
}