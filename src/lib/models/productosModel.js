
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

// Get products with pagination
export const getProductsWithPagination = async (page = 1, limit = 8) => {
    try {
        // Calculate offset for SQL query
        const offset = (page - 1) * limit;

        // SQL query with pagination
        const sql = `
            SELECT * FROM producto
            ORDER BY fecha DESC
            LIMIT ? OFFSET ?
        `;

        const result = await db(sql, [limit, offset]);
        return result;
    } catch (error) {
        console.error(`Error al cargar productos con paginación: ${error}`);
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

// Original function for reference
export const getAllProducts = async () => {
    try {
        const sql = 'SELECT * FROM producto';
        const result = await db(sql);
        return result;
    } catch (error) {
        console.error(`Error al cargar los productos: ${error}`);
        throw error;
    }
};