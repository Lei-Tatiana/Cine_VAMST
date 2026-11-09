import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import peliculaRoutes from "./routes/peliculaRoutes";
import asientoRoutes from "./routes/asientoRoutes";
import reservaRoutes from "./routes/reservaRoutes";
import authRoutes from "./routes/authRoutes";
import candyRoutes from "./routes/candyRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { verificarConexion } from "./config/db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/salud", async (req, res) => {
  try {
    await verificarConexion();
    res.json({ ok: true, data: { api: "ok", baseDeDatos: "ok" } });
  } catch (e: any) {
    res.status(503).json({ ok: false, error: { mensaje: `La API responde pero la base de datos no: ${e.message}` } });
  }
});

app.use("/api", peliculaRoutes);
app.use("/api", asientoRoutes);
app.use("/api", reservaRoutes);
app.use("/api", authRoutes);
app.use("/api", candyRoutes);

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, async () => {
  console.log(`VAMST backend escuchando en http://localhost:${PORT}`);
  try {
    await verificarConexion();
    console.log(`Base de datos conectada (${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME})`);
  } catch (e: any) {
    console.error(`NO SE PUDO CONECTAR A LA BASE DE DATOS: ${e.message}`);
    console.error("Revisá el archivo .env (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) y que MySQL esté encendido.");
  }
});