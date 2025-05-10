
import db from "../db";

// lib/models/productosModel.js

export const getProductosUser = async (userId) => {
    try {
        const sql = 'SELECT * FROM producto WHERE usuario_id = ?';
        const result = await db(sql, [userId]);
        return result;
    } catch (error) {
        console.error(`Error al cargar los productos del usuario: ${error}`);
        throw error;
    }
};


export const getProductsWithPagination = async (page = 1, limit = 8, search, categoria, material) => {
    try {
        const offset = (page - 1) * limit;

        let sql = `
            SELECT p.*,
                    u.nombres AS usuario, u.correo, u.urlImgPerfil AS imagenUsuario
            FROM producto p
            JOIN usuarios u ON p.usuario_id = u.idUsuario
            WHERE 1 = 1
        `;

        const params = [];

        // Filtro por búsqueda (nombre del producto o del usuario)
        if (search) {
            sql += ` AND (p.nombre LIKE ? OR u.nombres LIKE ?)`;
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm);
        }

        // Filtro por categoría
        if (categoria) {
            sql += ` AND p.categoria = ?`;
            params.push(categoria);
        }

        // Filtro por material
        if (material) {
            sql += ` AND p.tipo = ?`;
            params.push(material);
        }

        // Ordenar y paginar
        sql += `
            ORDER BY p.fecha DESC
            LIMIT ? OFFSET ?
        `;
        params.push(limit, offset);

        const result = await db(sql, params);
        console.log('result', result);
        return result;
    } catch (error) {
        console.error(`Error al cargar productos con filtros y paginación: ${error}`);
        throw error;
    }
};


// Get total count of products for pagination
export const getTotalProductsCount = async () => {
    try {
        const sql = 'SELECT COUNT(*) as total FROM producto';
        const result = await db(sql);
        return result[0]?.total || 0;
    } catch (error) {
        console.error(`Error al obtener el conteo total de productos: ${error}`);
        throw error;
    }
};

export const crearProducto = async (imagen, nombre, descripcion, tipo, categoria, precio, fecha, usuario_id) => {
    try {
        const sql = 'INSERT INTO producto (imagen, nombre, descripcion, tipo, categoria, precio, fecha, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        const result = await db(sql, [imagen, nombre, descripcion, tipo, categoria, precio, fecha, usuario_id]);
        return result[0]?.total || 0;
    } catch (error) {
        console.error(`Error al obtener crear el producto: ${error}`);
        throw error;
    }
}

export const editProducto = async ({ idProducto, imagen, nombre, descripcion, tipo, categoria, precio, fecha }) => {
    try {
        const sql = `
            UPDATE producto 
            SET imagen = ?, nombre = ?, descripcion = ?, tipo = ?, categoria = ?, precio = ?, fecha = ?
            WHERE idProducto = ?
        `;
        const result = await db(sql, [imagen, nombre, descripcion, tipo, categoria, precio, fecha, idProducto]);
        return result;
    } catch (error) {
        console.error(`Error al editar el producto: ${error}`);
        throw error;
    }
};

export const getUrlImgProducto = async(idProducto, userId)=>{
    try {
        const sql = `
            SELECT imagen FROM producto WHERE idProducto = ? AND usuario_id = ?
        `;
        const [result] = await db(sql, [idProducto, userId]);
        return result;
    } catch (error) {
        console.error(`Error al eliminar el producto: ${error}`);
        throw error;
    }
}

export const deleteProducto = async (userId, idProducto) => {
    try {
        const sql = `
            DELETE FROM producto WHERE idProducto = ? AND usuario_id = ?
        `;
        const result = await db(sql, [idProducto, userId]);
        return result;
    } catch (error) {
        console.error(`Error al eliminar el producto: ${error}`);
        throw error;
    }
}