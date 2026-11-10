import { Router } from "express";
import platoRoutes from "./platoRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";
import reservaRoutes from "./reservaRoutes.js";

const router = Router();

router.use("/platos", platoRoutes);
router.use("/categorias", categoriaRoutes);
router.use("/reservas", reservaRoutes);

export default router;
