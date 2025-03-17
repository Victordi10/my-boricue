import mysql from 'mysql2';

const configWeb = {
    host: process.env.WEBHOST,
    user: process.env.WEBUSER,
    password: process.env.WEBPASS,
    port: process.env.PORTDBWEB,
    database: process.env.WEBDB, // Asegúrate de que esta línea tenga el valor correcto
};

const getConnection = () => {
    const connection = mysql.createConnection(configWeb);
    connection.connect(err => {
        if (err) {
            console.error('Error en la conexión:', err);
            throw err;
        }
        //console.log("La base de datos se ha conectado correctamente");
    });
    return connection;
};

export default function executeQuery(sql, params) {
    return new Promise((resolve, reject) => {
        const connection = getConnection();
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
        connection.end(err => {
            if (err) {
                console.error("Error al cerrar la conexión", err);
            }
        });
    });
};

export{executeQuery, getConnection}