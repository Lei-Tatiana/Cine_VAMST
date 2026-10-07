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

app.use("/api", asientoRoutes);
