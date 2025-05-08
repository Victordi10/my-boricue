import db from "../db";

export const getUser = async (id) => {
    try {
        const sql = 'SELECT nombres, direccion, urlImgPerfil, identificacion, direccion, telefono, correo, rol FROM usuarios WHERE idUsuario = ?';
        const [results] = await db(sql, [id]);
        return results;
    } catch (error) {
        console.error(`Error al obtener usuarios: ${error}`);
        throw error;
    }
}

export const actualizarPerfil = async (nombres, telefono, direccion, imageUrl, id) => {
    try {
        const sql = `
            UPDATE usuarios SET 
                nombres = ?, 
                urlImgPerfil = COALESCE(?, urlImgPerfil), 
                telefono = ?, 
                direccion = ? 
            WHERE idUsuario = ?
        `;
        return await db(sql, [nombres, imageUrl, telefono, direccion, id]);
    } catch (error) {
        console.error(`Error al actualizar al usuario: ${error}`);
        throw error;
    }
};
