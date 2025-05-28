import db from "../db";

/**
 * Obtiene la lista de usuarios con los que el usuario ha tenido conversaciones.
 */
export const obtenerChats = async (usuarioId) => {
    try {
        const sql = `
      SELECT DISTINCT 
        CASE 
          WHEN c.idEmisor = ? THEN c.idReceptor 
          ELSE c.idEmisor 
        END AS idContacto,
        CASE 
          WHEN c.idEmisor = ? THEN u2.nombres 
          ELSE u1.nombres 
        END AS nombreContacto
      FROM chats c
      JOIN usuarios u1 ON c.idEmisor = u1.idUsuario
      JOIN usuarios u2 ON c.idReceptor = u2.idUsuario
      WHERE c.idEmisor = ? OR c.idReceptor = ?;
    `;
        const params = [usuarioId, usuarioId, usuarioId, usuarioId];
        return await db(sql, params);
    } catch (error) {
        manejarError("obtenerChats", error);
    }
};

/**
 * Obtiene los mensajes entre dos usuarios, ordenados por fecha.
 */
export const obtenerMensajes = async (id1, id2) => {
    try {
        const sql = `
      SELECT * FROM chats 
      WHERE (idEmisor = ? AND idReceptor = ?) 
         OR (idEmisor = ? AND idReceptor = ?)
      ORDER BY fechaCreacion ASC;
    `;
        const params = [id1, id2, id2, id1];
        return await db(sql, params);
    } catch (error) {
        manejarError("obtenerMensajes", error);
    }
};

/**
 * Guarda un nuevo mensaje entre dos usuarios.
 */
export const guardarMensaje = async (emisorId, receptorId, mensaje) => {
    try {
        const sql = `
      INSERT INTO chats (idEmisor, idReceptor, mensaje) 
      VALUES (?, ?, ?);
    `;
        const params = [emisorId, receptorId, mensaje];
        const result = await db(sql, params);
        console.log("💾 Mensaje guardado correctamente");
        return result;
    } catch (error) {
        manejarError("guardarMensaje", error);
    }
};

/**
 * Maneja y centraliza los errores con log.
 */
function manejarError(funcion, error) {
    console.error(`❌ Error en ${funcion}:`, error.message || error);
    throw error;
}
