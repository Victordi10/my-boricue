import db from "../db.js";


/**
 * Obtiene la lista de usuarios con los que el usuario ha tenido conversaciones.
 */
export const obtenerChats = async (usuarioId) => {
  try {
    const sql = `
      SELECT
        sub.idContacto,
        sub.nombreContacto,
        sub.avatar,
        c.idEmisor AS idEmisor,
        c.mensaje AS lastMessage,
        c.url_archivo AS lastFile,
        c.fecha AS lastMessageTime
      FROM (
        SELECT 
          CASE 
            WHEN c.idEmisor = ? THEN c.idReceptor 
            ELSE c.idEmisor 
          END AS idContacto,
          CASE 
            WHEN c.idEmisor = ? THEN u2.nombres 
            ELSE u1.nombres 
          END AS nombreContacto,
          CASE 
            WHEN c.idEmisor = ? THEN u2.urlImgPerfil
            ELSE u1.urlImgPerfil
          END AS avatar,
          MAX(c.fecha) AS ultimaFecha
        FROM chats c
        JOIN usuarios u1 ON c.idEmisor = u1.idUsuario
        JOIN usuarios u2 ON c.idReceptor = u2.idUsuario
        WHERE c.idEmisor = ? OR c.idReceptor = ?
        GROUP BY idContacto, nombreContacto, avatar
      ) sub
      JOIN chats c ON (
        (c.idEmisor = ? AND c.idReceptor = sub.idContacto) 
        OR (c.idEmisor = sub.idContacto AND c.idReceptor = ?)
      ) AND c.fecha = sub.ultimaFecha
      ORDER BY c.fecha DESC;
    `;

    const params = [
      usuarioId, usuarioId, usuarioId, // para CASEs
      usuarioId, usuarioId,            // para el WHERE original
      usuarioId, usuarioId             // para hacer match del último mensaje
    ];

    return await db(sql, params);
  } catch (error) {
    manejarError("obtenerChats", error);
  }
};


/**
 * Obtiene los mensajes entre dos usuarios, ordenados por fecha.
 */
export const obtenerMensajes = async (id1, id2, ultimoMensajeId = null, limit = 20) => {
  try {
    let sql = `
      SELECT * FROM chats 
      WHERE ((idEmisor = ? AND idReceptor = ?) 
         OR (idEmisor = ? AND idReceptor = ?))
    `;
    const params = [id1, id2, id2, id1];

    if (ultimoMensajeId) {
      sql += ` AND id < ?`;
      params.push(ultimoMensajeId);
    }

    sql += ` ORDER BY id DESC LIMIT ?`;
    params.push(limit);

    const mensajes = await db(sql, params);
    return mensajes.reverse(); // Porque los trajimos al revés
  } catch (error) {
    manejarError("obtenerMensajes", error);
  }
};


/**
 * Guarda un nuevo mensaje entre dos usuarios.
 */
export const guardarMensaje = async (idEmisor, idReceptor, mensaje = null, url_archivo = null) => {
  try {
    let tipo_contenido = "texto";
    if (mensaje && url_archivo) tipo_contenido = "mixto";
    else if (!mensaje && url_archivo) tipo_contenido = "imagen";

    const sql = `
            INSERT INTO chats (idEmisor, idReceptor, mensaje, url_archivo, tipo_contenido) 
            VALUES (?, ?, ?, ?, ?);
        `;
    const params = [idEmisor, idReceptor, mensaje, url_archivo, tipo_contenido];
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
