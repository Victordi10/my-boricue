import bcrypt from "bcryptjs";
import db from '../db.js'

export async function getUserByEmail(email) {
    try {
        const sql = "SELECT * FROM usuarios WHERE correo = ?";
        const results = await db(sql, [email]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        throw new Error(`Error al obtener usuario por correo: ${error.message}`);
    }
}

export const verificarPassword = async (inputPassword, hashPassword) => {
    return await bcrypt.compare(inputPassword, hashPassword);
};
