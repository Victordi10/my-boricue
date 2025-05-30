import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.WEBUSER,
    password: process.env.PASS,
    port: process.env.PORTDB,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Carga variables desde .env.local

/* console.log("📡 Configuración de la base de datos:");
console.log("host:", process.env.HOST);
console.log("user:", process.env.WEBUSER);
console.log("password:", process.env.PASS);
console.log("port:", process.env.PORTDB);
console.log("database:", process.env.DB); */

export default async function db(sql, params) {
    try {
        const [results] = await pool.query(sql, params);
        return results;

    } catch (error) {
        throw new Error(`Error en la consulta SQL: ${error.message}, :`, error);
    }
}
