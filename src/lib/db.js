import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.WEBHOST,
    user: process.env.WEBUSER,
    password: process.env.WEBPASS,
    port: process.env.PORTDBWEB,
    database: process.env.WEBDB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default async function db(sql, params) {
    try {
        const [results] = await pool.query(sql, params);
        return results;
    } catch (error) {
        throw new Error(`Error en la consulta SQL: ${error.message}`);
    }
}
