import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

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

// Hace una consulta mínima para confirmar que la base responde.
// La usan el arranque del servidor y el endpoint GET /api/salud.
export async function verificarConexion(): Promise<void> {
  await pool.query("SELECT 1");
}
