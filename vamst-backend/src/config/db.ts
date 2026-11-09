import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

<<<<<<< HEAD
// Conexión BBDD
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  decimalNumbers: true,
});

<<<<<<< HEAD
=======
// Hace una consulta mínima para confirmar que la base responde.
// La usan el arranque del servidor y el endpoint GET /api/salud.
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
export async function verificarConexion(): Promise<void> {
  await pool.query("SELECT 1");
}
