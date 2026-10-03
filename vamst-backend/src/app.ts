// Punto de arranque del servidor. Acá se juntan todas las rutas.
// Este es el ÚNICO archivo que se ejecuta directamente (npm run dev).

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import peliculaRoutes from "./routes/peliculaRoutes";
import asientoRoutes from "./routes/asientoRoutes";
import reservaRoutes from "./routes/reservaRoutes";
import authRoutes from "./routes/authRoutes";
import candyRoutes from "./routes/candyRoutes";

dotenv.config();

const app = express();

// TODO: app.use(cors()) y app.use(express.json())

// TODO: montar cada router bajo "/api", por ejemplo:
// app.use("/api", peliculaRoutes);
// app.use("/api", asientoRoutes);
// ...y así con el resto

// TODO: app.listen(process.env.PORT, () => console.log(...))
