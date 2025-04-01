import bcrypt from "bcryptjs";
import db from "../db";
import Register from "@/app/auth/register/page";

// Obtener usuario por correo
export async function getUserByEmail(email) {
    try {
        const sql = "SELECT idUsuario, contrasena FROM usuarios WHERE correo = ?";
        const [results] = await db(sql, [email]);  // Aquí ejecutamos la consulta

        // Si no encontramos el usuario, retornamos null
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error(`Error al obtener usuario por correo: ${error.message}`);
        return null; // Retornamos null en caso de error
    }
}

export async function registrarUser(mail, pass, names, dress, phon, rol, iden) {
    const estado = 'activo';

    try {
        // Verificar si el correo ya existe
        const existingUser = await getUserByEmail(mail);
        if (existingUser) {
            throw new Error('El correo ya está registrado');
        }

        // Insertar el nuevo usuario y obtener el ID
        const sql = 'INSERT INTO usuarios (identificacion, nombres, direccion, telefono, correo, contrasena, rol, estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db(sql, [iden, names, dress, phon, mail, pass, rol, estado]);

        if (!result.insertId) {
            throw new Error('No se pudo obtener el ID del usuario registrado');
        }

        return { message: 'Usuario registrado exitosamente', userId: result.insertId };
    } catch (error) {
        console.error('Error en registrarUser:', error);
        return { error: error.message };
    }
}


// Verificar si las contraseñas coinciden
export const verificarPassword = async (inputPassword, hashPassword) => {
    return await bcrypt.compare(inputPassword, hashPassword);  // Compara la contraseña
};
