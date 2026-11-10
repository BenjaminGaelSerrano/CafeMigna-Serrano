import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Permite que el frontend (Vite, otro puerto) consuma la API.
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
